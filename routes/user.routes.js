import express from "express"
import {
  getUsers,
  getAdmins,
  getUserById,
  createAdmin,
  updateUser,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller.js"
import { protect, isAdminOrSuperadmin, isSuperadmin } from "../middleware/auth.middleware.js"
import { registerValidation, validate } from "../middleware/validator.middleware.js"

const router = express.Router()

// All routes are protected
router.use(protect)

router.get("/admins", isSuperadmin, getAdmins)
router.post("/create-admin", isSuperadmin, registerValidation, validate, createAdmin)
router.put("/:id/role", isAdminOrSuperadmin, updateUserRole)
router.delete("/:id", isSuperadmin, deleteUser)

// Admin and superadmin routes
router.get("/", isAdminOrSuperadmin, getUsers)
router.get("/:id", isAdminOrSuperadmin, getUserById)
router.put("/:id", isAdminOrSuperadmin, updateUser)

export default router
