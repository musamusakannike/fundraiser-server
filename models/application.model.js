import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Application title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Application description is required"],
    },
    proofDocuments: [
      {
        type: String,
        required: [true, "Proof documents are required"],
      },
    ],
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for messages
applicationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "application",
})

const Application = mongoose.model("Application", applicationSchema)

export default Application
