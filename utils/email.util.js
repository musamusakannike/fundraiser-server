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

// Email templates with beautiful green and white theme
export const emailTemplates = {
  // Welcome email template
  welcomeEmail: (name) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            🕌 Welcome to Islamic Fundraiser
          </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background: white; margin: 0 20px; border-radius: 8px; margin-top: -10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
              ✨
            </div>
          </div>
          
          <h2 style="color: #16a34a; margin: 0 0 20px; font-size: 24px; text-align: center;">Assalamu Alaikum, ${name}!</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining our platform. We're excited to have you as part of our community dedicated to helping those in need.
          </p>
          
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 25px 0;">
            <h3 style="color: #16a34a; margin: 0 0 15px; font-size: 18px;">With Islamic Fundraiser, you can:</h3>
            <div style="color: #374151; font-size: 15px; line-height: 1.6;">
              <div style="margin: 8px 0; display: flex; align-items: center;">
                <span style="color: #22c55e; margin-right: 10px; font-weight: bold;">🎯</span>
                Browse active fundraising campaigns
              </div>
              <div style="margin: 8px 0; display: flex; align-items: center;">
                <span style="color: #22c55e; margin-right: 10px; font-weight: bold;">📝</span>
                Apply for assistance
              </div>
              <div style="margin: 8px 0; display: flex; align-items: center;">
                <span style="color: #22c55e; margin-right: 10px; font-weight: bold;">📊</span>
                Stay updated on campaign progress
              </div>
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            If you have any questions, please don't hesitate to contact us. We're here to help!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}" style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); transition: all 0.3s ease;">
              Get Started
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #6b7280; background: #f9fafb;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #16a34a;">The Islamic Fundraiser Team</strong>
          </p>
        </div>
      </div>
    `
  },

  // New application notification to admins
  newApplicationNotification: (applicationDetails) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">
            🔔 New Application Submitted
          </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background: white; margin: 0 20px; border-radius: 8px; margin-top: -10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
              !
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 25px; text-align: center;">
            A new application has been submitted and requires your review.
          </p>
          
          <!-- Application Details Card -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 12px; border: 2px solid #22c55e; margin: 25px 0;">
            <h3 style="color: #16a34a; margin: 0 0 20px; font-size: 20px; text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              Application Details
            </h3>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #16a34a; display: inline-block; width: 100px;">Title:</strong>
              <span style="color: #374151; font-weight: 600;">${applicationDetails.title}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #16a34a; display: inline-block; width: 100px;">Applicant:</strong>
              <span style="color: #374151;">${applicationDetails.fullName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #16a34a; display: inline-block; width: 100px;">Email:</strong>
              <span style="color: #374151;">${applicationDetails.email}</span>
            </div>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #22c55e;">
              <strong style="color: #16a34a;">Description:</strong>
              <p style="color: #374151; margin: 10px 0 0; line-height: 1.6; background: white; padding: 15px; border-radius: 6px;">
                ${applicationDetails.description}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/admin/applications" style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); font-size: 16px;">
              Review Application
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #6b7280; background: #f9fafb;">
          <p style="margin: 0; font-size: 14px;">
            <strong style="color: #16a34a;">The Islamic Fundraiser Team</strong>
          </p>
        </div>
      </div>
    `
  },

  // Application status update to user
  applicationStatusUpdate: (applicationDetails) => {
    const statusColor = applicationDetails.status.toLowerCase() === 'approved' ? '#22c55e' : 
                       applicationDetails.status.toLowerCase() === 'rejected' ? '#ef4444' : '#f59e0b';
    const statusEmoji = applicationDetails.status.toLowerCase() === 'approved' ? '✅' : 
                       applicationDetails.status.toLowerCase() === 'rejected' ? '❌' : '⏳';
    
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">
            📧 Application Status Update
          </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background: white; margin: 0 20px; border-radius: 8px; margin-top: -10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #16a34a; margin: 0 0 20px; font-size: 22px;">Assalamu Alaikum, ${applicationDetails.fullName}!</h2>
          
          <!-- Status Card -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 12px; border-left: 6px solid ${statusColor}; margin: 25px 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">${statusEmoji}</div>
            <h3 style="color: #374151; margin: 0 0 10px; font-size: 18px;">Your application</h3>
            <p style="color: #16a34a; font-size: 20px; font-weight: bold; margin: 0 0 10px;">"${applicationDetails.title}"</p>
            <p style="margin: 0; font-size: 18px;">has been <strong style="color: ${statusColor}; text-transform: uppercase;">${applicationDetails.status}</strong></p>
          </div>
          
          ${applicationDetails.message ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 25px 0;">
              <h4 style="color: #16a34a; margin: 0 0 10px; font-size: 16px;">💬 Message from Admin:</h4>
              <p style="color: #374151; margin: 0; line-height: 1.6; font-style: italic;">
                "${applicationDetails.message}"
              </p>
            </div>
          ` : ''}
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0;">
            You can log in to your account to view more details and track your application progress.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);">
              View Dashboard
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #6b7280; background: #f9fafb;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #16a34a;">The Islamic Fundraiser Team</strong>
          </p>
        </div>
      </div>
    `
  },

  // New message notification
  newMessageNotification: (messageDetails) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">
            💬 New Message Received
          </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background: white; margin: 0 20px; border-radius: 8px; margin-top: -10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
              ✉️
            </div>
          </div>
          
          <h2 style="color: #16a34a; margin: 0 0 20px; font-size: 22px;">Dear ${messageDetails.recipientName},</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            You have received a new message regarding application <strong>"${messageDetails.applicationTitle}"</strong>:
          </p>
          
          <!-- Message Card -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #22c55e; margin: 25px 0;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #16a34a; font-size: 16px;">From:</strong>
              <span style="color: #374151; font-weight: 600; margin-left: 10px;">${messageDetails.senderName}</span>
            </div>
            
            <div style="border-top: 1px solid #22c55e; padding-top: 15px; margin-top: 15px;">
              <strong style="color: #16a34a; font-size: 16px;">Message:</strong>
              <div style="background: white; margin-top: 10px; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <p style="color: #374151; margin: 0; line-height: 1.6; font-size: 15px;">
                  ${messageDetails.content}
                </p>
              </div>
            </div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0;">
            Please log in to your account to view the full conversation and respond.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/messages" style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);">
              View Messages
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #6b7280; background: #f9fafb;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #16a34a;">The Islamic Fundraiser Team</strong>
          </p>
        </div>
      </div>
    `
  },

  // Reset password email
  resetPasswordEmail: (name, resetToken) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">
            🔐 Password Reset Request
          </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px; background: white; margin: 0 20px; border-radius: 8px; margin-top: -10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
              🔑
            </div>
          </div>
          
          <h2 style="color: #16a34a; margin: 0 0 20px; font-size: 22px;">Dear ${name},</h2>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password. If you didn't make this request, please ignore this email and your password will remain unchanged.
          </p>
          
          <!-- Security Notice -->
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
              <strong>🛡️ Security Notice:</strong> This password reset link will expire in 10 minutes for your security.
            </p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 25px 0;">
            To reset your password, click the button below:
          </p>
          
          <div style="text-align: center; margin: 35px 0;">
            <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}" 
               style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 15px 35px; text-decoration: none; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); font-size: 16px; transition: all 0.3s ease;">
              🔓 Reset My Password
            </a>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 25px 0; text-align: center;">
            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
              Or copy and paste this link in your browser:<br>
              <span style="color: #16a34a; word-break: break-all; font-family: monospace; font-size: 12px;">
                ${process.env.CLIENT_URL}/reset-password?token=${resetToken}
              </span>
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 25px 0; text-align: center;">
            If you're having trouble with the button above, copy and paste the link into your web browser.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; color: #6b7280; background: #f9fafb;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            <strong style="color: #16a34a;">The Islamic Fundraiser Team</strong>
          </p>
          <p style="margin: 10px 0 0; font-size: 12px; color: #9ca3af;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    `
  },
}