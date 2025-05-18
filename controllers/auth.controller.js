import User from "../models/user.model.js"
import { generateToken } from "../utils/token.util.js"
import { sendEmail, emailTemplates } from "../utils/email.util.js"

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      })
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
    })

    // Send welcome email
    await sendEmail({
      email: user.email,
      subject: "Welcome to Islamic Fundraiser",
      message: emailTemplates.welcomeEmail(user.fullName),
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    })
  }
}

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber } = req.body

    // Find user and update
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, phoneNumber },
      { new: true, runValidators: true },
    ).select("-password")

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    })
  }
}

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Find user
    const user = await User.findById(req.user._id)

    // Check if current password matches
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    })
  }
}
