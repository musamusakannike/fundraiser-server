import express from "express"
import {
  createCampaign,
  getCampaigns,
  getActiveCampaigns,
  getCompletedCampaigns,
  getCampaignById,
  updateCampaign,
  updateCampaignImages,
  updateCampaignStatus,
  deleteCampaign,
} from "../controllers/campaign.controller.js"
import { protect, isAdminOrSuperadmin } from "../middleware/auth.middleware.js"
import { campaignValidation, validate } from "../middleware/validator.middleware.js"
import { uploadCampaignImages, handleUploadErrors } from "../middleware/upload.middleware.js"

const router = express.Router()

// Public routes
router.get("/", getCampaigns)
router.get("/active", getActiveCampaigns)
router.get("/completed", getCompletedCampaigns)
router.get("/:id", getCampaignById)

// Protected routes for admins and superadmins
router.use(protect)
router.use(isAdminOrSuperadmin)

router.post("/", uploadCampaignImages, handleUploadErrors, campaignValidation, validate, createCampaign)
router.put("/:id", campaignValidation, validate, updateCampaign)
router.put("/:id/images", uploadCampaignImages, handleUploadErrors, updateCampaignImages)
router.put("/:id/status", updateCampaignStatus)
router.delete("/:id", deleteCampaign)

export default router
