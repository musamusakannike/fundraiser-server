import User from "../models/user.model.js"

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin/Superadmin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    })
  }
}

// @desc    Get all admins (superadmin only)
// @route   GET /api/users/admins
// @access  Private/Superadmin
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password")

    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admins",
      error: error.message,
    })
  }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin/Superadmin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    })
  }
}

// @desc    Create a new admin (superadmin only)
// @route   POST /api/users/create-admin
// @access  Private/Superadmin
export const createAdmin = async (req, res) => {
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

    // Create new admin
    const admin = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      role: "admin",
    })

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message,
    })
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin/Superadmin
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, isActive } = req.body

    // Find user
    let user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if superadmin is trying to update another superadmin
    if (
      user.role === "superadmin" &&
      req.user.role === "superadmin" &&
      user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Superadmin cannot update another superadmin",
      })
    }

    // Check if admin is trying to update an admin or superadmin
    if (req.user.role === "admin" && (user.role === "admin" || user.role === "superadmin")) {
      return res.status(403).json({
        success: false,
        message: "Admin cannot update another admin or superadmin",
      })
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phoneNumber, isActive },
      { new: true, runValidators: true },
    ).select("-password")

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    })
  }
}

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Superadmin
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body

    // Validate role
    if (!["user", "admin", "superadmin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      })
    }

    // Find user
    let user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if trying to update own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot update your own role",
      })
    }

    // Update user role
    user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true }).select("-password")

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    })
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Superadmin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if trying to delete own account
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete your own account",
      })
    }

    // Check if trying to delete a superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Superadmin accounts cannot be deleted",
      })
    }

    await user.deleteOne()

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    })
  }
}
