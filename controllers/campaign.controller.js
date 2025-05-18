import Campaign from "../models/campaign.model.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private/Admin/Superadmin
export const createCampaign = async (req, res) => {
  try {
    const { title, description, amountNeeded, bankAccountNumber, bankAccountName, bankName } = req.body

    // Get image URLs from multer middleware
    const images = req.files.map((file) => file.path)

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      })
    }

    // Create campaign
    const campaign = await Campaign.create({
      title,
      description,
      images,
      amountNeeded,
      bankAccountNumber,
      bankAccountName,
      bankName,
      createdBy: req.user._id,
    })

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating campaign",
      error: error.message,
    })
  }
}

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = async (req, res) => {
  try {
    const { status, search, sort } = req.query

    // Build query
    const query = {}

    // Filter by status if provided
    if (status) {
      query.status = status
    }

    // Search by title if provided
    if (search) {
      query.title = { $regex: search, $options: "i" }
    }

    // Build sort options
    let sortOptions = {}
    if (sort === "newest") {
      sortOptions = { createdAt: -1 }
    } else if (sort === "oldest") {
      sortOptions = { createdAt: 1 }
    } else if (sort === "amount-high") {
      sortOptions = { amountNeeded: -1 }
    } else if (sort === "amount-low") {
      sortOptions = { amountNeeded: 1 }
    } else {
      // Default sort by newest
      sortOptions = { createdAt: -1 }
    }

    // Execute query
    const campaigns = await Campaign.find(query).sort(sortOptions).populate("createdBy", "fullName")

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching campaigns",
      error: error.message,
    })
  }
}

// @desc    Get active campaigns
// @route   GET /api/campaigns/active
// @access  Public
export const getActiveCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "active" })
      .sort({ createdAt: -1 })
      .populate("createdBy", "fullName")

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching active campaigns",
      error: error.message,
    })
  }
}

// @desc    Get completed campaigns
// @route   GET /api/campaigns/completed
// @access  Public
export const getCompletedCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "completed" })
      .sort({ updatedAt: -1 })
      .populate("createdBy", "fullName")

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching completed campaigns",
      error: error.message,
    })
  }
}

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate("createdBy", "fullName")
      .populate({
        path: "applications",
        select: "title status createdAt",
        match: { user: req.user ? req.user._id : null },
      })

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    res.status(200).json({
      success: true,
      campaign,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching campaign",
      error: error.message,
    })
  }
}

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private/Admin/Superadmin
export const updateCampaign = async (req, res) => {
  try {
    const { title, description, amountNeeded, bankAccountNumber, bankAccountName, bankName } = req.body

    // Find campaign
    let campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    // Update campaign
    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { title, description, amountNeeded, bankAccountNumber, bankAccountName, bankName },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      campaign,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating campaign",
      error: error.message,
    })
  }
}

// @desc    Update campaign images
// @route   PUT /api/campaigns/:id/images
// @access  Private/Admin/Superadmin
export const updateCampaignImages = async (req, res) => {
  try {
    // Get image URLs from multer middleware
    const images = req.files.map((file) => file.path)

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      })
    }

    // Find campaign
    let campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    // Update campaign images
    campaign = await Campaign.findByIdAndUpdate(req.params.id, { images }, { new: true, runValidators: true })

    res.status(200).json({
      success: true,
      message: "Campaign images updated successfully",
      campaign,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating campaign images",
      error: error.message,
    })
  }
}

// @desc    Update campaign status
// @route   PUT /api/campaigns/:id/status
// @access  Private/Admin/Superadmin
export const updateCampaignStatus = async (req, res) => {
  try {
    const { status } = req.body

    // Validate status
    if (!["active", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      })
    }

    // Find campaign
    let campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    // Update campaign status
    campaign = await Campaign.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

    // Create notification for all users
    const users = await User.find({ role: "user" })

    const notifications = users.map((user) => ({
      recipient: user._id,
      sender: req.user._id,
      type: "campaign_update",
      title: "Campaign Status Update",
      message: `Campaign "${campaign.title}" has been marked as ${status}`,
      relatedTo: {
        model: "Campaign",
        id: campaign._id,
      },
    }))

    await Notification.insertMany(notifications)

    res.status(200).json({
      success: true,
      message: `Campaign marked as ${status} successfully`,
      campaign,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating campaign status",
      error: error.message,
    })
  }
}

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin/Superadmin
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      })
    }

    await campaign.deleteOne()

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting campaign",
      error: error.message,
    })
  }
}
