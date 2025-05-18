import { body, validationResult } from "express-validator"

// Middleware to validate request
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  next()
}

// User registration validation rules
export const registerValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("phoneNumber").optional().isMobilePhone().withMessage("Please provide a valid phone number"),
]

// User login validation rules
export const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Campaign creation validation rules
export const campaignValidation = [
  body("title").trim().notEmpty().withMessage("Campaign title is required"),
  body("description").trim().notEmpty().withMessage("Campaign description is required"),
  body("amountNeeded")
    .isNumeric()
    .withMessage("Amount needed must be a number")
    .custom((value) => value > 0)
    .withMessage("Amount needed must be greater than 0"),
  body("bankAccountNumber").trim().notEmpty().withMessage("Bank account number is required"),
  body("bankAccountName").trim().notEmpty().withMessage("Bank account name is required"),
  body("bankName").trim().notEmpty().withMessage("Bank name is required"),
]

// Application submission validation rules
export const applicationValidation = [
  body("title").trim().notEmpty().withMessage("Application title is required"),
  body("description").trim().notEmpty().withMessage("Application description is required"),
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("campaign").isMongoId().withMessage("Valid campaign ID is required"),
]

// Message validation rules
export const messageValidation = [
  body("content").trim().notEmpty().withMessage("Message content is required"),
  body("application").isMongoId().withMessage("Valid application ID is required"),
]
