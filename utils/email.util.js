import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Send email function
export const sendEmail = async (options) => {
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  }

  await transporter.sendMail(mailOptions)
}

// Email templates
export const emailTemplates = {
  // Welcome email template
  welcomeEmail: (name) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">Welcome to Islamic Fundraiser!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for joining our platform. We're excited to have you as part of our community.</p>
        <p>With Islamic Fundraiser, you can:</p>
        <ul>
          <li>Browse active fundraising campaigns</li>
          <li>Apply for assistance</li>
          <li>Stay updated on campaign progress</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Islamic Fundraiser Team</p>
      </div>
    `
  },

  // New application notification to admins
  newApplicationNotification: (applicationDetails) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">New Application Submitted</h2>
        <p>A new application has been submitted for your review:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Title:</strong> ${applicationDetails.title}</p>
          <p><strong>Applicant:</strong> ${applicationDetails.fullName}</p>
          <p><strong>Email:</strong> ${applicationDetails.email}</p>
          <p><strong>Campaign:</strong> ${applicationDetails.campaignTitle}</p>
          <p><strong>Description:</strong> ${applicationDetails.description}</p>
        </div>
        <p>Please log in to the admin dashboard to review this application.</p>
        <p>Best regards,<br>The Islamic Fundraiser Team</p>
      </div>
    `
  },

  // Application status update to user
  applicationStatusUpdate: (applicationDetails) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">Application Status Update</h2>
        <p>Dear ${applicationDetails.fullName},</p>
        <p>Your application "${applicationDetails.title}" has been <strong>${applicationDetails.status}</strong>.</p>
        ${applicationDetails.message ? `<p><strong>Message from admin:</strong> ${applicationDetails.message}</p>` : ""}
        <p>You can log in to your account to view more details.</p>
        <p>Best regards,<br>The Islamic Fundraiser Team</p>
      </div>
    `
  },

  // New message notification
  newMessageNotification: (messageDetails) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #333;">New Message Received</h2>
        <p>Dear ${messageDetails.recipientName},</p>
        <p>You have received a new message regarding application "${messageDetails.applicationTitle}":</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>From:</strong> ${messageDetails.senderName}</p>
          <p><strong>Message:</strong> ${messageDetails.content}</p>
        </div>
        <p>Please log in to your account to respond.</p>
        <p>Best regards,<br>The Islamic Fundraiser Team</p>
      </div>
    `
  },
}
