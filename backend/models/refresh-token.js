import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB TTL index
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    deviceInfo: {
      userAgent: String,
      ipAddress: String,
    },
  },
  { timestamps: true }
);

// Index for faster lookups
refreshTokenSchema.index({ userId: 1, token: 1 });
refreshTokenSchema.index({ token: 1, isRevoked: 1 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;

