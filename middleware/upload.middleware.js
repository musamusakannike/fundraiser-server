import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup storage for campaign images
const campaignStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "islamic-fundraiser/campaigns",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

// Setup storage for application proof documents
const applicationStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "islamic-fundraiser/applications",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
    resource_type: "auto",
  },
});

// Setup storage for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "islamic-fundraiser/profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "File upload only supports the following filetypes - " + filetypes
    )
  );
};

// Create upload instances
export const uploadCampaignImages = multer({
  storage: campaignStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
}).array("images", 5); // Max 5 images

export const uploadApplicationDocs = multer({
  storage: applicationStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter,
}).array("proofDocuments", 3); // Max 3 documents

export const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
}).single("profileImage");

// Middleware to handle file upload errors
export const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};
