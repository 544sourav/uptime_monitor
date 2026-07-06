import mongoose, { Document, Schema } from "mongoose";

export interface IMonitor extends Document {
  userId: string;
  userEmail: string;
  name: string;
  url: string;
  intervalSecond: number;
  status: "up" | "down" | "unknown";
  consecutiveFailures: number;
  lastCheckedAt: Date | null;
}

const monitorSchema = new Schema<IMonitor>(
  {
    userId: { type: String, required: true, index: true },
    userEmail: { type: String, required: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    intervalSecond: {
      type: Number,
      default: 60,
    },
    status: {
      type: String,
      enum: ["up", "down", "unknown"],
      default: "unknown",
    },
    consecutiveFailures: {
      type: Number,
      default: 0,
    },
    lastCheckedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Monitor =
  mongoose.models.Monitor || mongoose.model<IMonitor>("Monitor", monitorSchema);

export default Monitor;
