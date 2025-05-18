import express from "express"
import { sendMessage, getMessages } from "../controllers/message.controller.js"
import { protect } from "../middleware/auth.middleware.js"
import { messageValidation, validate } from "../middleware/validator.middleware.js"

const router = express.Router()

// All routes are protected
router.use(protect)

router.post("/", messageValidation, validate, sendMessage)
router.get("/:applicationId", getMessages)

export default router
