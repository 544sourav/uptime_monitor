export interface Incident {
  _id: string;
  monitorId: string;
  monitorName: string;
  url: string;
  startedAt: string;
  resolvedAt: string | null;
  status: "ongoing" | "resolved";
  aiSummary: string;
  errorDetail: string;
  createdAt: string;
}
