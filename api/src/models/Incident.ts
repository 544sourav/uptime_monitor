import mongoose , {Schema , Document} from "mongoose";

export interface IIncident extends Document {
  monitorId: mongoose.Types.ObjectId;
  monitorName: string;
  url: string;
  startedAt: Date;
  resolvedAt: Date;
  status: "ongoing" | "resolved";
  aiSummary: string;
  errorDetail:string;
} 

const incidentSchema = new Schema<IIncident>(
  {
    monitorId: {
      type: Schema.Types.ObjectId,
      ref: "Monitor",
      required: true,
    },
    monitorName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["ongoing", "resolved"],
      default: "ongoing",
    },
    aiSummary: {
      type: String,
      default: "",
    },
    errorDetail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IIncident>("Incident", incidentSchema);