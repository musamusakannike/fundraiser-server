import express from "express"
import { getDashboardStats, getRecentActivities } from "../controllers/dashboard.controller.js"
import { protect, isAdminOrSuperadmin } from "../middleware/auth.middleware.js"

const router = express.Router()

// All routes are protected and only accessible by admins and superadmins
router.use(protect)
router.use(isAdminOrSuperadmin)

router.get("/stats", getDashboardStats)
router.get("/recent-activities", getRecentActivities)

export default router
