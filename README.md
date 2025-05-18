## Project Overview

I've created a comprehensive backend API for your Nigerian Islamic fundraiser platform with all the requested features and user roles. Here's a breakdown of what's included:

### Core Features

1. **User Role Management**

1. Superadmin can manage all admins and perform all admin actions
1. Admin can manage campaigns and respond to user applications
1. User can view campaigns and submit applications

1. **Campaign Management**

1. Create campaigns with images, details, and banking information
1. Update campaign status (active, completed, cancelled)
1. Filter and search campaigns

1. **Application System**

1. Users can apply to campaigns with proof documents
1. Admins can review and respond to applications
1. Status tracking for applications (pending, approved, rejected)

1. **Messaging System**

1. In-app messaging between users and admins
1. Email notifications for important events

1. **Notification System**

1. In-app notifications for users and admins
1. Mark notifications as read/unread

### Technical Implementation

1. **Authentication & Authorization**

1. JWT-based authentication
1. Role-based route protection
1. Secure password handling with bcryptjs

1. **File Uploads**

1. Multer for handling file uploads
1. Cloudinary for storing images and documents

1. **Database Models**

1. User model with role management
1. Campaign model with all required fields
1. Application model with status tracking
1. Notification and Message models

1. **Security Features**

1. Input validation with express-validator
1. HTTP header security with Helmet
1. Rate limiting for API protection
1. CORS configuration

1. **Email Notifications**

1. Nodemailer integration with Gmail
1. HTML email templates for different notifications

1. **Dashboard & Analytics**

1. Statistics on campaigns, applications, and users
1. Recent activity tracking

## How to Use

1. **Setup Environment Variables**

1. Copy the `.env.example` file to `.env` and fill in your details
1. Configure MongoDB connection, JWT secret, email credentials, and Cloudinary API keys

1. **Install Dependencies**

```shellscript
npm install
```

3. **Start the Server**

```shellscript
npm start
```

4. **API Documentation**

1. The API is organized into logical routes:

1. `/api/auth` - Authentication routes
1. `/api/users` - User management
1. `/api/campaigns` - Campaign management
1. `/api/applications` - Application handling
1. `/api/notifications` - Notification system
1. `/api/messages` - Messaging system
1. `/api/dashboard` - Statistics and analytics

## Security Considerations

- All sensitive routes are protected with JWT authentication
- Role-based access control is implemented for all routes
- Input validation is applied to all form submissions
- File uploads are validated and restricted by type and size
- Rate limiting is applied to prevent abuse

This backend API provides a solid foundation for your Nigerian Islamic fundraiser platform, with all the requested features implemented in a secure and scalable manner.

Please make sure to add the following environment variables to your project:
PORT
MONGODB_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
JWT_EXPIRE
EMAIL_USERNAME
EMAIL_PASSWORD
FROM_NAME
FROM_EMAIL
