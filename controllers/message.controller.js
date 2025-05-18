import Message from "../models/message.model.js"
import Application from "../models/application.model.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"
import { sendEmail, emailTemplates } from "../utils/email.util.js"

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { content, application: applicationId } = req.body

    // Check if application exists
    const application = await Application.findById(applicationId)
      .populate("user", "fullName email")
      .populate("campaign", "title")

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    // Check if user is authorized to send message for this application
    if (req.user.role === "user" && application.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to send message for this application",
      })
    }

    // Create message
    const message = await Message.create({
      sender: req.user._id,
      application: applicationId,
      content,
      isAdminMessage: req.user.role === "admin" || req.user.role === "superadmin",
    })

    // Determine recipient
    let recipient
    let recipientName

    if (req.user.role === "user") {
      // If user is sending message, notify all admins
      const admins = await User.find({ role: { $in: ["admin", "superadmin"] } })

      // Create notifications for all admins
      const notifications = admins.map((admin) => ({
        recipient: admin._id,
        sender: req.user._id,
        type: "message_received",
        title: "New Message Received",
        message: `New message from ${req.user.fullName} regarding application "${application.title}"`,
        relatedTo: {
          model: "Message",
          id: message._id,
        },
      }))

      await Notification.insertMany(notifications)

      // Send email notifications to all admins
      for (const admin of admins) {
        await sendEmail({
          email: admin.email,
          subject: "New Message Received",
          message: emailTemplates.newMessageNotification({
            recipientName: admin.fullName,
            applicationTitle: application.title,
            senderName: req.user.fullName,
            content,
          }),
        })
      }
    } else {
      // If admin is sending message, notify the user
      recipient = application.user._id
      recipientName = application.user.fullName

      // Create notification for the user
      await Notification.create({
        recipient,
        sender: req.user._id,
        type: "message_received",
        title: "New Message Received",
        message: `New message from admin regarding your application "${application.title}"`,
        relatedTo: {
          model: "Message",
          id: message._id,
        },
      })

      // Send email notification to the user
      await sendEmail({
        email: application.user.email,
        subject: "New Message Received",
        message: emailTemplates.newMessageNotification({
          recipientName,
          applicationTitle: application.title,
          senderName: `Admin (${req.user.fullName})`,
          content,
        }),
      })
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    })
  }
}

// @desc    Get messages for an application
// @route   GET /api/messages/:applicationId
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { applicationId } = req.params

    // Check if application exists
    const application = await Application.findById(applicationId)

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    // Check if user is authorized to view messages for this application
    if (req.user.role === "user" && application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view messages for this application",
      })
    }

    // Get messages
    const messages = await Message.find({ application: applicationId })
      .sort({ createdAt: 1 })
      .populate("sender", "fullName role")

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    })
  }
}
