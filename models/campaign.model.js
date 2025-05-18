import mongoose from "mongoose"

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Campaign title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Campaign description is required"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one image is required"],
      },
    ],
    amountNeeded: {
      type: Number,
      required: [true, "Amount needed is required"],
      min: [1, "Amount must be greater than 0"],
    },
    bankAccountNumber: {
      type: String,
      required: [true, "Bank account number is required"],
      trim: true,
    },
    bankAccountName: {
      type: String,
      required: [true, "Bank account name is required"],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

// Virtual for applications
campaignSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "campaign",
})

const Campaign = mongoose.model("Campaign", campaignSchema)

export default Campaign
