import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import campaignRoutes from "./routes/campaign.routes.js"
import applicationRoutes from "./routes/application.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import messageRoutes from "./routes/message.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import contactRoutes from "./routes/contact.routes.js"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Apply security middleware
app.use(helmet())
app.use(cors())

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
})
app.use("/api", limiter)

// Logging middleware
app.use(morgan("dev"))

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/campaigns", campaignRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/contact", contactRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

export default app
