import express from "express"
import { register, login, getMe, updateProfile, changePassword, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js"
import { registerValidation, loginValidation, validate } from "../middleware/validator.middleware.js"

const router = express.Router()

// Public routes
router.post("/register", registerValidation, validate, register)
router.post("/login", loginValidation, validate, login)

// Protected routes
router.get("/me", protect, getMe)
router.put("/update-profile", protect, updateProfile)
router.put("/change-password", protect, changePassword)

// Forgot password
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router
