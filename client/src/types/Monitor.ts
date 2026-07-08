export interface Monitor {
  _id: string;
  userId: string;
  userEmail: string;
  name: string;
  url: string;
  intervalSecond: number;
  status: "up" | "down" | "unknown";
  consecutiveFailures: number;
  lastCheckedAt: string | null;
  createdAt:string |null;
}
