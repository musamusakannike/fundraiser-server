import express from "express"
import {
  submitApplication,
  getApplications,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js"
import { protect, isAdminOrSuperadmin } from "../middleware/auth.middleware.js"
import { applicationValidation, validate } from "../middleware/validator.middleware.js"
import { uploadApplicationDocs, handleUploadErrors } from "../middleware/upload.middleware.js"

const router = express.Router()

// All routes are protected
router.use(protect)

// User routes
router.post("/", uploadApplicationDocs, handleUploadErrors, applicationValidation, validate, submitApplication)
router.get("/my-applications", getMyApplications)
router.get("/:id", getApplicationById)

// Admin and superadmin routes
router.get("/", isAdminOrSuperadmin, getApplications)
router.put("/:id/status", isAdminOrSuperadmin, updateApplicationStatus)
router.delete("/:id", isAdminOrSuperadmin, deleteApplication)

export default router
