import Notification from "../models/notification.model.js"

// @desc    Get user's notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("sender", "fullName")

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    })
  }
}

// @desc    Get unread notifications count
// @route   GET /api/notifications/unread-count
// @access  Private
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    })

    res.status(200).json({
      success: true,
      count,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching unread count",
      error: error.message,
    })
  }
}

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      })
    }

    // Check if user is authorized to mark this notification as read
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to mark this notification as read",
      })
    }

    // Update notification
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking notification as read",
      error: error.message,
    })
  }
}

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/mark-all-read
// @access  Private
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true })

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking all notifications as read",
      error: error.message,
    })
  }
}

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      })
    }

    // Check if user is authorized to delete this notification
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this notification",
      })
    }

    await notification.deleteOne()

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting notification",
      error: error.message,
    })
  }
}
