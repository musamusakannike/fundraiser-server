import express from "express"
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

// All routes are protected
router.use(protect)

router.get("/", getNotifications)
router.get("/unread-count", getUnreadCount)
router.put("/:id/read", markAsRead)
router.put("/mark-all-read", markAllAsRead)
router.delete("/:id", deleteNotification)

export default router
