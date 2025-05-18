### Nigerian Islamic Fundraiser API Documentation

## Introduction

This documentation provides comprehensive details about the Nigerian Islamic Fundraiser API endpoints, request/response formats, and authentication requirements. This API enables frontend applications to manage users, campaigns, applications, notifications, and messaging for an Islamic fundraising platform.

## Base URL

```plaintext
https://api.nigerian-islamic-fundraiser.com
```

Replace this with your actual API base URL after deployment.

## Authentication

The API uses JWT (JSON Web Token) for authentication. Most endpoints require a valid token to be included in the request header.

**How to authenticate:**

1. Obtain a token by registering or logging in
2. Include the token in the Authorization header of your requests:


```plaintext
Authorization: Bearer <your_token_here>
```

## API Endpoints

### Table of Contents

- [Authentication](#authentication-endpoints)
- [Users](#user-endpoints)
- [Campaigns](#campaign-endpoints)
- [Applications](#application-endpoints)
- [Notifications](#notification-endpoints)
- [Messages](#message-endpoints)
- [Dashboard](#dashboard-endpoints)


---

## Authentication Endpoints

### Register a new user

```plaintext
POST /api/auth/register
```

Creates a new user account.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+2341234567890" // Optional
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Status Codes:**

- `201`: User created successfully
- `400`: Validation error or user already exists
- `500`: Server error


### Login user

```plaintext
POST /api/auth/login
```

Authenticates a user and returns a token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Status Codes:**

- `200`: Login successful
- `401`: Invalid credentials
- `500`: Server error


### Get current user profile

```plaintext
GET /api/auth/me
```

Returns the profile of the currently authenticated user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phoneNumber": "+2341234567890",
    "profileImage": "",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Update user profile

```plaintext
PUT /api/auth/update-profile
```

Updates the profile of the currently authenticated user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "fullName": "John Smith",
  "phoneNumber": "+2349876543210"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Smith",
    "email": "john@example.com",
    "role": "user",
    "phoneNumber": "+2349876543210",
    "profileImage": "",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:15:22.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Change password

```plaintext
PUT /api/auth/change-password
```

Changes the password of the currently authenticated user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "currentPassword": "password123",
  "newPassword": "newPassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Status Codes:**

- `200`: Success
- `401`: Current password is incorrect
- `500`: Server error


---

## User Endpoints

### Get all users (Admin/Superadmin only)

```plaintext
GET /api/users
```

Returns a list of all users.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "users": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "phoneNumber": "+2341234567890",
      "profileImage": "",
      "isActive": true,
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    },
    // More users...
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `500`: Server error


### Get all admins (Superadmin only)

```plaintext
GET /api/users/admins
```

Returns a list of all admin users.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "admins": [
    {
      "_id": "60d21b4667d0d8992e610c86",
      "fullName": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "phoneNumber": "+2341234567891",
      "profileImage": "",
      "isActive": true,
      "createdAt": "2023-06-22T10:31:40.000Z",
      "updatedAt": "2023-06-22T10:31:40.000Z"
    },
    // More admins...
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not superadmin)
- `500`: Server error


### Get user by ID (Admin/Superadmin only)

```plaintext
GET /api/users/:id
```

Returns a specific user by ID.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phoneNumber": "+2341234567890",
    "profileImage": "",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: User not found
- `500`: Server error


### Create a new admin (Superadmin only)

```plaintext
POST /api/users/create-admin
```

Creates a new admin user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "fullName": "New Admin",
  "email": "newadmin@example.com",
  "password": "password123",
  "phoneNumber": "+2341234567892"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Admin created successfully",
  "admin": {
    "_id": "60d21b4667d0d8992e610c87",
    "fullName": "New Admin",
    "email": "newadmin@example.com",
    "role": "admin"
  }
}
```

**Status Codes:**

- `201`: Admin created successfully
- `400`: Validation error or admin already exists
- `401`: Not authenticated
- `403`: Not authorized (not superadmin)
- `500`: Server error


### Update user (Admin/Superadmin only)

```plaintext
PUT /api/users/:id
```

Updates a user's information.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "fullName": "Updated Name",
  "email": "updated@example.com",
  "phoneNumber": "+2341234567893",
  "isActive": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "Updated Name",
    "email": "updated@example.com",
    "role": "user",
    "phoneNumber": "+2341234567893",
    "profileImage": "",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T12:45:30.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: User not found
- `500`: Server error


### Update user role (Superadmin only)

```plaintext
PUT /api/users/:id/role
```

Updates a user's role.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "role": "admin"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User role updated successfully",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "phoneNumber": "+2341234567890",
    "profileImage": "",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T13:20:15.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `400`: Invalid role
- `401`: Not authenticated
- `403`: Not authorized (not superadmin)
- `404`: User not found
- `500`: Server error


### Delete user (Superadmin only)

```plaintext
DELETE /api/users/:id
```

Deletes a user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not superadmin) or trying to delete superadmin/self
- `404`: User not found
- `500`: Server error


---

## Campaign Endpoints

### Create a new campaign (Admin/Superadmin only)

```plaintext
POST /api/campaigns
```

Creates a new fundraising campaign.

**Headers:**

```plaintext
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**

```plaintext
title: "Help Build a Mosque in Lagos"
description: "We are raising funds to build a new mosque in Lagos community..."
amountNeeded: 5000000
bankAccountNumber: "0123456789"
bankAccountName: "Islamic Fundraiser"
bankName: "First Bank"
images: [file1, file2, ...] (max 5 images)
```

**Response:**

```json
{
  "success": true,
  "message": "Campaign created successfully",
  "campaign": {
    "_id": "60d21b4667d0d8992e610c90",
    "title": "Help Build a Mosque in Lagos",
    "description": "We are raising funds to build a new mosque in Lagos community...",
    "images": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
    ],
    "amountNeeded": 5000000,
    "bankAccountNumber": "0123456789",
    "bankAccountName": "Islamic Fundraiser",
    "bankName": "First Bank",
    "status": "active",
    "createdBy": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T14:00:00.000Z",
    "updatedAt": "2023-06-22T14:00:00.000Z"
  }
}
```

**Status Codes:**

- `201`: Campaign created successfully
- `400`: Validation error or missing images
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `500`: Server error


### Get all campaigns

```plaintext
GET /api/campaigns
```

Returns a list of all campaigns with optional filtering.

**Query Parameters:**

- `status`: Filter by status (active, completed, cancelled)
- `search`: Search by title
- `sort`: Sort by (newest, oldest, amount-high, amount-low)


**Response:**

```json
{
  "success": true,
  "count": 5,
  "campaigns": [
    {
      "_id": "60d21b4667d0d8992e610c90",
      "title": "Help Build a Mosque in Lagos",
      "description": "We are raising funds to build a new mosque in Lagos community...",
      "images": [
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
      ],
      "amountNeeded": 5000000,
      "bankAccountNumber": "0123456789",
      "bankAccountName": "Islamic Fundraiser",
      "bankName": "First Bank",
      "status": "active",
      "createdBy": {
        "_id": "60d21b4667d0d8992e610c86",
        "fullName": "Admin User"
      },
      "createdAt": "2023-06-22T14:00:00.000Z",
      "updatedAt": "2023-06-22T14:00:00.000Z"
    },
    // More campaigns...
  ]
}
```

**Status Codes:**

- `200`: Success
- `500`: Server error


### Get active campaigns

```plaintext
GET /api/campaigns/active
```

Returns a list of all active campaigns.

**Response:**

```json
{
  "success": true,
  "count": 3,
  "campaigns": [
    {
      "_id": "60d21b4667d0d8992e610c90",
      "title": "Help Build a Mosque in Lagos",
      "description": "We are raising funds to build a new mosque in Lagos community...",
      "images": [
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
      ],
      "amountNeeded": 5000000,
      "bankAccountNumber": "0123456789",
      "bankAccountName": "Islamic Fundraiser",
      "bankName": "First Bank",
      "status": "active",
      "createdBy": {
        "_id": "60d21b4667d0d8992e610c86",
        "fullName": "Admin User"
      },
      "createdAt": "2023-06-22T14:00:00.000Z",
      "updatedAt": "2023-06-22T14:00:00.000Z"
    },
    // More active campaigns...
  ]
}
```

**Status Codes:**

- `200`: Success
- `500`: Server error


### Get completed campaigns

```plaintext
GET /api/campaigns/completed
```

Returns a list of all completed campaigns.

**Response:**

```json
{
  "success": true,
  "count": 2,
  "campaigns": [
    {
      "_id": "60d21b4667d0d8992e610c91",
      "title": "Ramadan Food Drive",
      "description": "We are raising funds for food distribution during Ramadan...",
      "images": [
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352500/islamic-fundraiser/campaigns/image3.jpg"
      ],
      "amountNeeded": 2000000,
      "bankAccountNumber": "9876543210",
      "bankAccountName": "Islamic Fundraiser",
      "bankName": "GTBank",
      "status": "completed",
      "createdBy": {
        "_id": "60d21b4667d0d8992e610c86",
        "fullName": "Admin User"
      },
      "createdAt": "2023-05-22T10:00:00.000Z",
      "updatedAt": "2023-06-10T15:30:00.000Z"
    },
    // More completed campaigns...
  ]
}
```

**Status Codes:**

- `200`: Success
- `500`: Server error


### Get campaign by ID

```plaintext
GET /api/campaigns/:id
```

Returns a specific campaign by ID.

**Headers:**

```plaintext
Authorization: Bearer <token> (optional, for showing user's applications)
```

**Response:**

```json
{
  "success": true,
  "campaign": {
    "_id": "60d21b4667d0d8992e610c90",
    "title": "Help Build a Mosque in Lagos",
    "description": "We are raising funds to build a new mosque in Lagos community...",
    "images": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
    ],
    "amountNeeded": 5000000,
    "bankAccountNumber": "0123456789",
    "bankAccountName": "Islamic Fundraiser",
    "bankName": "First Bank",
    "status": "active",
    "createdBy": {
      "_id": "60d21b4667d0d8992e610c86",
      "fullName": "Admin User"
    },
    "createdAt": "2023-06-22T14:00:00.000Z",
    "updatedAt": "2023-06-22T14:00:00.000Z",
    "applications": [
      {
        "_id": "60d21b4667d0d8992e610c95",
        "title": "Application for Mosque Project",
        "status": "pending",
        "createdAt": "2023-06-23T09:15:00.000Z"
      }
    ]
  }
}
```

**Status Codes:**

- `200`: Success
- `404`: Campaign not found
- `500`: Server error


### Update campaign (Admin/Superadmin only)

```plaintext
PUT /api/campaigns/:id
```

Updates a campaign's information.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Updated Mosque Project in Lagos",
  "description": "Updated description for the mosque project...",
  "amountNeeded": 6000000,
  "bankAccountNumber": "0123456789",
  "bankAccountName": "Islamic Fundraiser",
  "bankName": "First Bank"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Campaign updated successfully",
  "campaign": {
    "_id": "60d21b4667d0d8992e610c90",
    "title": "Updated Mosque Project in Lagos",
    "description": "Updated description for the mosque project...",
    "images": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
    ],
    "amountNeeded": 6000000,
    "bankAccountNumber": "0123456789",
    "bankAccountName": "Islamic Fundraiser",
    "bankName": "First Bank",
    "status": "active",
    "createdBy": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T14:00:00.000Z",
    "updatedAt": "2023-06-23T10:30:00.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Campaign not found
- `500`: Server error


### Update campaign images (Admin/Superadmin only)

```plaintext
PUT /api/campaigns/:id/images
```

Updates a campaign's images.

**Headers:**

```plaintext
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**

```plaintext
images: [file1, file2, ...] (max 5 images)
```

**Response:**

```json
{
  "success": true,
  "message": "Campaign images updated successfully",
  "campaign": {
    "_id": "60d21b4667d0d8992e610c90",
    "title": "Help Build a Mosque in Lagos",
    "description": "We are raising funds to build a new mosque in Lagos community...",
    "images": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352600/islamic-fundraiser/campaigns/new-image1.jpg",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352601/islamic-fundraiser/campaigns/new-image2.jpg"
    ],
    "amountNeeded": 5000000,
    "bankAccountNumber": "0123456789",
    "bankAccountName": "Islamic Fundraiser",
    "bankName": "First Bank",
    "status": "active",
    "createdBy": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T14:00:00.000Z",
    "updatedAt": "2023-06-23T11:45:00.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `400`: Missing images
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Campaign not found
- `500`: Server error


### Update campaign status (Admin/Superadmin only)

```plaintext
PUT /api/campaigns/:id/status
```

Updates a campaign's status.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "status": "completed"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Campaign marked as completed successfully",
  "campaign": {
    "_id": "60d21b4667d0d8992e610c90",
    "title": "Help Build a Mosque in Lagos",
    "description": "We are raising funds to build a new mosque in Lagos community...",
    "images": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352400/islamic-fundraiser/campaigns/image1.jpg",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352401/islamic-fundraiser/campaigns/image2.jpg"
    ],
    "amountNeeded": 5000000,
    "bankAccountNumber": "0123456789",
    "bankAccountName": "Islamic Fundraiser",
    "bankName": "First Bank",
    "status": "completed",
    "createdBy": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T14:00:00.000Z",
    "updatedAt": "2023-06-24T09:20:00.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `400`: Invalid status
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Campaign not found
- `500`: Server error


### Delete campaign (Admin/Superadmin only)

```plaintext
DELETE /api/campaigns/:id
```

Deletes a campaign.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Campaign not found
- `500`: Server error


---

## Application Endpoints

### Submit a new application

```plaintext
POST /api/applications
```

Submits a new application for a campaign.

**Headers:**

```plaintext
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**

```plaintext
title: "Application for Mosque Project"
description: "I would like to apply for assistance with the mosque project..."
fullName: "John Doe"
email: "john@example.com"
additionalDetails: "Additional information about my application..."
campaign: "60d21b4667d0d8992e610c90" (campaign ID)
proofDocuments: [file1, file2, ...] (max 3 documents)
```

**Response:**

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "_id": "60d21b4667d0d8992e610c95",
    "title": "Application for Mosque Project",
    "description": "I would like to apply for assistance with the mosque project...",
    "proofDocuments": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352700/islamic-fundraiser/applications/doc1.pdf",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352701/islamic-fundraiser/applications/doc2.jpg"
    ],
    "fullName": "John Doe",
    "email": "john@example.com",
    "additionalDetails": "Additional information about my application...",
    "status": "pending",
    "user": "60d21b4667d0d8992e610c85",
    "campaign": "60d21b4667d0d8992e610c90",
    "createdAt": "2023-06-23T09:15:00.000Z",
    "updatedAt": "2023-06-23T09:15:00.000Z"
  }
}
```

**Status Codes:**

- `201`: Application submitted successfully
- `400`: Validation error, missing documents, or campaign not active
- `401`: Not authenticated
- `404`: Campaign not found
- `500`: Server error


### Get all applications (Admin/Superadmin only)

```plaintext
GET /api/applications
```

Returns a list of all applications with optional filtering.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Query Parameters:**

- `status`: Filter by status (pending, approved, rejected)
- `campaign`: Filter by campaign ID
- `sort`: Sort by (newest, oldest)


**Response:**

```json
{
  "success": true,
  "count": 5,
  "applications": [
    {
      "_id": "60d21b4667d0d8992e610c95",
      "title": "Application for Mosque Project",
      "description": "I would like to apply for assistance with the mosque project...",
      "proofDocuments": [
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352700/islamic-fundraiser/applications/doc1.pdf",
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352701/islamic-fundraiser/applications/doc2.jpg"
      ],
      "fullName": "John Doe",
      "email": "john@example.com",
      "additionalDetails": "Additional information about my application...",
      "status": "pending",
      "user": {
        "_id": "60d21b4667d0d8992e610c85",
        "fullName": "John Doe",
        "email": "john@example.com"
      },
      "campaign": {
        "_id": "60d21b4667d0d8992e610c90",
        "title": "Help Build a Mosque in Lagos"
      },
      "createdAt": "2023-06-23T09:15:00.000Z",
      "updatedAt": "2023-06-23T09:15:00.000Z"
    },
    // More applications...
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `500`: Server error


### Get user's applications

```plaintext
GET /api/applications/my-applications
```

Returns a list of the authenticated user's applications.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "applications": [
    {
      "_id": "60d21b4667d0d8992e610c95",
      "title": "Application for Mosque Project",
      "description": "I would like to apply for assistance with the mosque project...",
      "proofDocuments": [
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352700/islamic-fundraiser/applications/doc1.pdf",
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352701/islamic-fundraiser/applications/doc2.jpg"
      ],
      "fullName": "John Doe",
      "email": "john@example.com",
      "additionalDetails": "Additional information about my application...",
      "status": "pending",
      "user": "60d21b4667d0d8992e610c85",
      "campaign": {
        "_id": "60d21b4667d0d8992e610c90",
        "title": "Help Build a Mosque in Lagos",
        "status": "active"
      },
      "createdAt": "2023-06-23T09:15:00.000Z",
      "updatedAt": "2023-06-23T09:15:00.000Z"
    },
    // More applications...
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Get application by ID

```plaintext
GET /api/applications/:id
```

Returns a specific application by ID.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "application": {
    "_id": "60d21b4667d0d8992e610c95",
    "title": "Application for Mosque Project",
    "description": "I would like to apply for assistance with the mosque project...",
    "proofDocuments": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352700/islamic-fundraiser/applications/doc1.pdf",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352701/islamic-fundraiser/applications/doc2.jpg"
    ],
    "fullName": "John Doe",
    "email": "john@example.com",
    "additionalDetails": "Additional information about my application...",
    "status": "pending",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "campaign": {
      "_id": "60d21b4667d0d8992e610c90",
      "title": "Help Build a Mosque in Lagos",
      "status": "active"
    },
    "createdAt": "2023-06-23T09:15:00.000Z",
    "updatedAt": "2023-06-23T09:15:00.000Z",
    "messages": [
      {
        "_id": "60d21b4667d0d8992e610c98",
        "sender": {
          "_id": "60d21b4667d0d8992e610c85",
          "fullName": "John Doe",
          "role": "user"
        },
        "content": "I have additional information to provide.",
        "isAdminMessage": false,
        "createdAt": "2023-06-23T10:30:00.000Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c99",
        "sender": {
          "_id": "60d21b4667d0d8992e610c86",
          "fullName": "Admin User",
          "role": "admin"
        },
        "content": "Thank you for your application. We will review it shortly.",
        "isAdminMessage": true,
        "createdAt": "2023-06-23T11:00:00.000Z"
      }
    ]
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (user trying to access another user's application)
- `404`: Application not found
- `500`: Server error


### Update application status (Admin/Superadmin only)

```plaintext
PUT /api/applications/:id/status
```

Updates an application's status.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "status": "approved",
  "message": "Your application has been approved. We will contact you soon."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Application marked as approved successfully",
  "application": {
    "_id": "60d21b4667d0d8992e610c95",
    "title": "Application for Mosque Project",
    "description": "I would like to apply for assistance with the mosque project...",
    "proofDocuments": [
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352700/islamic-fundraiser/applications/doc1.pdf",
      "https://res.cloudinary.com/your-cloud-name/image/upload/v1624352701/islamic-fundraiser/applications/doc2.jpg"
    ],
    "fullName": "John Doe",
    "email": "john@example.com",
    "additionalDetails": "Additional information about my application...",
    "status": "approved",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "campaign": {
      "_id": "60d21b4667d0d8992e610c90",
      "title": "Help Build a Mosque in Lagos"
    },
    "createdAt": "2023-06-23T09:15:00.000Z",
    "updatedAt": "2023-06-24T14:30:00.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `400`: Invalid status
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Application not found
- `500`: Server error


### Delete application (Admin/Superadmin only)

```plaintext
DELETE /api/applications/:id
```

Deletes an application.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `404`: Application not found
- `500`: Server error


---

## Notification Endpoints

### Get user's notifications

```plaintext
GET /api/notifications
```

Returns a list of the authenticated user's notifications.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "notifications": [
    {
      "_id": "60d21b4667d0d8992e610ca0",
      "recipient": "60d21b4667d0d8992e610c85",
      "sender": {
        "_id": "60d21b4667d0d8992e610c86",
        "fullName": "Admin User"
      },
      "type": "application_response",
      "title": "Application Status Update",
      "message": "Your application \"Application for Mosque Project\" has been approved: Your application has been approved. We will contact you soon.",
      "relatedTo": {
        "model": "Application",
        "id": "60d21b4667d0d8992e610c95"
      },
      "isRead": false,
      "createdAt": "2023-06-24T14:30:00.000Z"
    },
    // More notifications...
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Get unread notifications count

```plaintext
GET /api/notifications/unread-count
```

Returns the count of unread notifications for the authenticated user.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 2
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Mark notification as read

```plaintext
PUT /api/notifications/:id/read
```

Marks a specific notification as read.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Notification marked as read",
  "notification": {
    "_id": "60d21b4667d0d8992e610ca0",
    "recipient": "60d21b4667d0d8992e610c85",
    "sender": "60d21b4667d0d8992e610c86",
    "type": "application_response",
    "title": "Application Status Update",
    "message": "Your application \"Application for Mosque Project\" has been approved: Your application has been approved. We will contact you soon.",
    "relatedTo": {
      "model": "Application",
      "id": "60d21b4667d0d8992e610c95"
    },
    "isRead": true,
    "createdAt": "2023-06-24T14:30:00.000Z"
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not recipient of notification)
- `404`: Notification not found
- `500`: Server error


### Mark all notifications as read

```plaintext
PUT /api/notifications/mark-all-read
```

Marks all of the authenticated user's notifications as read.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `500`: Server error


### Delete notification

```plaintext
DELETE /api/notifications/:id
```

Deletes a notification.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not recipient of notification)
- `404`: Notification not found
- `500`: Server error


---

## Message Endpoints

### Send a message

```plaintext
POST /api/messages
```

Sends a message related to an application.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "content": "I have additional information to provide.",
  "application": "60d21b4667d0d8992e610c95"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c98",
    "sender": "60d21b4667d0d8992e610c85",
    "application": "60d21b4667d0d8992e610c95",
    "content": "I have additional information to provide.",
    "isAdminMessage": false,
    "createdAt": "2023-06-23T10:30:00.000Z"
  }
}
```

**Status Codes:**

- `201`: Message sent successfully
- `400`: Validation error
- `401`: Not authenticated
- `403`: Not authorized (user trying to send message for another user's application)
- `404`: Application not found
- `500`: Server error


### Get messages for an application

```plaintext
GET /api/messages/:applicationId
```

Returns all messages for a specific application.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "messages": [
    {
      "_id": "60d21b4667d0d8992e610c98",
      "sender": {
        "_id": "60d21b4667d0d8992e610c85",
        "fullName": "John Doe",
        "role": "user"
      },
      "content": "I have additional information to provide.",
      "isAdminMessage": false,
      "createdAt": "2023-06-23T10:30:00.000Z"
    },
    {
      "_id": "60d21b4667d0d8992e610c99",
      "sender": {
        "_id": "60d21b4667d0d8992e610c86",
        "fullName": "Admin User",
        "role": "admin"
      },
      "content": "Thank you for your application. We will review it shortly.",
      "isAdminMessage": true,
      "createdAt": "2023-06-23T11:00:00.000Z"
    }
  ]
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (user trying to access messages for another user's application)
- `404`: Application not found
- `500`: Server error


---

## Dashboard Endpoints

### Get dashboard statistics (Admin/Superadmin only)

```plaintext
GET /api/dashboard/stats
```

Returns statistics for the dashboard.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "campaigns": {
      "total": 10,
      "active": 5,
      "completed": 3,
      "cancelled": 2
    },
    "applications": {
      "total": 25,
      "pending": 10,
      "approved": 12,
      "rejected": 3
    },
    "users": {
      "total": 50,
      "admins": 3,
      "superadmins": 1
    }
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `500`: Server error


### Get recent activities (Admin/Superadmin only)

```plaintext
GET /api/dashboard/recent-activities
```

Returns recent activities for the dashboard.

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "activities": {
    "recentCampaigns": [
      {
        "_id": "60d21b4667d0d8992e610c90",
        "title": "Help Build a Mosque in Lagos",
        "status": "active",
        "createdBy": {
          "_id": "60d21b4667d0d8992e610c86",
          "fullName": "Admin User"
        },
        "createdAt": "2023-06-22T14:00:00.000Z"
      },
      // More recent campaigns...
    ],
    "recentApplications": [
      {
        "_id": "60d21b4667d0d8992e610c95",
        "title": "Application for Mosque Project",
        "status": "pending",
        "user": {
          "_id": "60d21b4667d0d8992e610c85",
          "fullName": "John Doe"
        },
        "campaign": {
          "_id": "60d21b4667d0d8992e610c90",
          "title": "Help Build a Mosque in Lagos"
        },
        "createdAt": "2023-06-23T09:15:00.000Z"
      },
      // More recent applications...
    ]
  }
}
```

**Status Codes:**

- `200`: Success
- `401`: Not authenticated
- `403`: Not authorized (not admin/superadmin)
- `500`: Server error


---

## Data Models

### User Model

```json
{
  "_id": "ObjectId",
  "fullName": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required, hashed)",
  "role": "String (enum: user, admin, superadmin, default: user)",
  "phoneNumber": "String",
  "profileImage": "String",
  "isActive": "Boolean (default: true)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Campaign Model

```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "description": "String (required)",
  "images": ["String (required)"],
  "amountNeeded": "Number (required)",
  "bankAccountNumber": "String (required)",
  "bankAccountName": "String (required)",
  "bankName": "String (required)",
  "status": "String (enum: active, completed, cancelled, default: active)",
  "createdBy": "ObjectId (ref: User, required)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Application Model

```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "description": "String (required)",
  "proofDocuments": ["String (required)"],
  "fullName": "String (required)",
  "email": "String (required)",
  "additionalDetails": "String",
  "status": "String (enum: pending, approved, rejected, default: pending)",
  "user": "ObjectId (ref: User, required)",
  "campaign": "ObjectId (ref: Campaign, required)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Notification Model

```json
{
  "_id": "ObjectId",
  "recipient": "ObjectId (ref: User, required)",
  "sender": "ObjectId (ref: User)",
  "type": "String (enum: application_submitted, application_response, message_received, campaign_update, system, required)",
  "title": "String (required)",
  "message": "String (required)",
  "relatedTo": {
    "model": "String (enum: Application, Campaign, Message, User)",
    "id": "ObjectId (refPath: relatedTo.model)"
  },
  "isRead": "Boolean (default: false)",
  "createdAt": "Date"
}
```

### Message Model

```json
{
  "_id": "ObjectId",
  "sender": "ObjectId (ref: User, required)",
  "application": "ObjectId (ref: Application, required)",
  "content": "String (required)",
  "isAdminMessage": "Boolean (default: false)",
  "createdAt": "Date"
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong",
  "error": "Detailed error information (only in development mode)"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Resource created
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Resource not found
- `500`: Server error


## Authentication Flow

1. **Registration**:

1. User submits registration form
2. Backend creates user with "user" role
3. JWT token is returned



2. **Login**:

1. User submits email and password
2. Backend validates credentials
3. JWT token is returned



3. **Using Protected Routes**:

1. Include the JWT token in the Authorization header
2. Format: `Authorization: Bearer <token>`





## File Upload Guidelines

When uploading files (campaign images or application proof documents):

1. Use `multipart/form-data` as the content type
2. Maximum file sizes:

1. Campaign images: 5MB each (max 5 images)
2. Application documents: 10MB each (max 3 documents)
3. Profile images: 2MB



3. Supported file types:

1. Images: JPEG, JPG, PNG, GIF
2. Documents: PDF, DOC, DOCX (for application proof documents)





## Implementation Notes for Frontend Developers

1. **Token Storage**:

1. Store JWT token securely (e.g., in HttpOnly cookies or secure localStorage)
2. Include token in all authenticated requests



2. **Role-Based UI**:

1. Check user role from token payload to show/hide UI elements
2. Implement different dashboards for users, admins, and superadmins



3. **File Uploads**:

1. Use FormData API for file uploads
2. Implement client-side validation for file size and type



4. **Real-time Features**:

1. Poll for new notifications periodically
2. Consider implementing WebSockets for real-time messaging



5. **Error Handling**:

1. Implement global error handling for API responses
2. Show appropriate error messages to users





This API documentation provides all the necessary information for frontend developers to integrate with the Nigerian Islamic Fundraiser backend API. If you have any questions or need further clarification on any endpoint, please reach out to the backend team.