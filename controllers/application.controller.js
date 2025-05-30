import Application from "../models/application.model.js"
import Campaign from "../models/campaign.model.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"
import { sendEmail, emailTemplates } from "../utils/email.util.js"

// @desc    Submit a new application
// @route   POST /api/applications
// @access  Private
export const submitApplication = async (req, res) => {
  try {
    const { title, description, fullName, email, additionalDetails, campaign: campaignId } = req.body

    // Check if campaign exists and is active if campaignId is provided
    let campaign
    if (campaignId) {
      campaign = await Campaign.findById(campaignId)

      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found",
        })
      }

      if (campaign.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Cannot apply to a non-active campaign",
        })
      }
    }

    // Get proof document URLs from multer middleware
    const proofDocuments = req.files.map((file) => file.path)

    if (proofDocuments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one proof document is required",
      })
    }

    // Create application
    const applicationData = {
      title,
      description,
      proofDocuments,
      fullName,
      email,
      additionalDetails,
      user: req.user._id,
    }

    // Only add campaign if it exists
    if (campaignId) {
      applicationData.campaign = campaignId
    }

    const application = await Application.create(applicationData)

    // Create notifications for all admins
    const admins = await User.find({ role: { $in: ["admin", "superadmin"] } })

    const notifications = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user._id,
      type: "application_submitted",
      title: "New Application Submitted",
      message: `A new application "${title}" has been submitted for a campaign`,
      relatedTo: {
        model: "Application",
        id: application._id,
      },
    }))

    await Notification.insertMany(notifications)

    // Send email notifications to all admins
    for (const admin of admins) {
      await sendEmail({
        email: admin.email,
        subject: "New Application Submitted",
        message: emailTemplates.newApplicationNotification({
          title,
          fullName,
          email,
          campaignTitle: campaign?.title,
          description,
        }),
      })
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting application",
      error: error.message,
    })
  }
}

// @desc    Get all applications (admin only)
// @route   GET /api/applications
// @access  Private/Admin/Superadmin
export const getApplications = async (req, res) => {
  try {
    const { status, campaign, sort } = req.query

    // Build query
    const query = {}

    // Filter by status if provided
    if (status) {
      query.status = status
    }

    // Filter by campaign if provided
    if (campaign) {
      query.campaign = campaign
    }

    // Build sort options
    let sortOptions = {}
    if (sort === "newest") {
      sortOptions = { createdAt: -1 }
    } else if (sort === "oldest") {
      sortOptions = { createdAt: 1 }
    } else {
      // Default sort by newest
      sortOptions = { createdAt: -1 }
    }

    // Execute query
    const applications = await Application.find(query)
      .sort(sortOptions)
      .populate("user", "fullName email")
      .populate("campaign", "title")

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
      error: error.message,
    })
  }
}

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("campaign", "title status")

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your applications",
      error: error.message,
    })
  }
}

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("user", "fullName email")
      .populate("campaign", "title status")
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "fullName role",
        },
      })

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    // Check if user is authorized to view this application
    if (req.user.role === "user" && application.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application",
      })
    }

    res.status(200).json({
      success: true,
      application,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching application",
      error: error.message,
    })
  }
}

// @desc    Update application status (admin only)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin/Superadmin
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, message } = req.body

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      })
    }

    // Find application
    let application = await Application.findById(req.params.id)
      .populate("user", "fullName email")
      .populate("campaign", "title")

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    // Update application status
    application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })
      .populate("user", "fullName email")
      .populate("campaign", "title")

    // Create notification for the user
    await Notification.create({
      recipient: application.user._id,
      sender: req.user._id,
      type: "application_response",
      title: "Application Status Update",
      message: `Your application "${application.title}" has been ${status}${message ? `: ${message}` : ""}`,
      relatedTo: {
        model: "Application",
        id: application._id,
      },
    })

    // Send email notification to the user
    await sendEmail({
      email: application.user.email,
      subject: "Application Status Update",
      message: emailTemplates.applicationStatusUpdate({
        fullName: application.user.fullName,
        title: application.title,
        status,
        message,
      }),
    })

    res.status(200).json({
      success: true,
      message: `Application marked as ${status} successfully`,
      application,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating application status",
      error: error.message,
    })
  }
}

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin/Superadmin
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    await application.deleteOne()

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting application",
      error: error.message,
    })
  }
}

// @desc    Assign campaign to application
// @route   PUT /api/applications/:id/assign-campaign
// @access  Private/Admin/Superadmin
export const assignCampaign = async (req, res) => {
  try {
    const { campaignId } = req.body

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      })
    }

    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    // Find application
    let application = await Application.findById(req.params.id)

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    // Update application with campaign
    application = await Application.findByIdAndUpdate(
      req.params.id,
      { campaign: campaignId },
      { new: true, runValidators: true },
    ).populate("campaign", "title")

    // Create notification for the user
    await Notification.create({
      recipient: application.user,
      sender: req.user._id,
      type: "application_response",
      title: "Application Update",
      message: `Your application "${application.title}" has been assigned to campaign "${campaign.title}"`,
      relatedTo: {
        model: "Application",
        id: application._id,
      },
    })

    res.status(200).json({
      success: true,
      message: "Campaign assigned to application successfully",
      application,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error assigning campaign to application",
      error: error.message,
    })
  }
}
