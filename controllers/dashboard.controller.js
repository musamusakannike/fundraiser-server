import Campaign from "../models/campaign.model.js"
import Application from "../models/application.model.js"
import User from "../models/user.model.js"

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin/Superadmin
export const getDashboardStats = async (req, res) => {
  try {
    // Get campaign statistics
    const totalCampaigns = await Campaign.countDocuments()
    const activeCampaigns = await Campaign.countDocuments({ status: "active" })
    const completedCampaigns = await Campaign.countDocuments({ status: "completed" })
    const cancelledCampaigns = await Campaign.countDocuments({ status: "cancelled" })

    // Get application statistics
    const totalApplications = await Application.countDocuments()
    const pendingApplications = await Application.countDocuments({ status: "pending" })
    const approvedApplications = await Application.countDocuments({ status: "approved" })
    const rejectedApplications = await Application.countDocuments({ status: "rejected" })

    // Get user statistics
    const totalUsers = await User.countDocuments({ role: "user" })
    const totalAdmins = await User.countDocuments({ role: "admin" })
    const totalSuperadmins = await User.countDocuments({ role: "superadmin" })

    res.status(200).json({
      success: true,
      stats: {
        campaigns: {
          total: totalCampaigns,
          active: activeCampaigns,
          completed: completedCampaigns,
          cancelled: cancelledCampaigns,
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          approved: approvedApplications,
          rejected: rejectedApplications,
        },
        users: {
          total: totalUsers,
          admins: totalAdmins,
          superadmins: totalSuperadmins,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard statistics",
      error: error.message,
    })
  }
}

// @desc    Get recent activities
// @route   GET /api/dashboard/recent-activities
// @access  Private/Admin/Superadmin
export const getRecentActivities = async (req, res) => {
  try {
    // Get recent campaigns
    const recentCampaigns = await Campaign.find().sort({ createdAt: -1 }).limit(5).populate("createdBy", "fullName")

    // Get recent applications
    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName")
      .populate("campaign", "title")

    res.status(200).json({
      success: true,
      activities: {
        recentCampaigns,
        recentApplications,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent activities",
      error: error.message,
    })
  }
}
