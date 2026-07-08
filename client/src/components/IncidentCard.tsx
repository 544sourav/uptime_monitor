import type { Incident } from "../types/Incident";

interface Props {
  incident: Incident;
}

export default function IncidentCard({ incident }: Props) {
  const statusColor =
    incident.status === "resolved" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{incident.monitorName}</h3>

        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${statusColor}`} />
          <span className="uppercase">{incident.status}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-300">
        <p>
          <span className="font-semibold text-white">Started:</span>{" "}
          {new Date(incident.startedAt).toLocaleString()}
        </p>

        <p>
          <span className="font-semibold text-white">Resolved:</span>{" "}
          {incident.resolvedAt
            ? new Date(incident.resolvedAt).toLocaleString()
            : "Still Ongoing"}
        </p>

        <p>
          <span className="font-semibold text-white">Error:</span>{" "}
          {incident.errorDetail}
        </p>

        <div>
          <p className="mb-1 font-semibold text-white">AI Summary</p>

          <div className="rounded-md bg-slate-800 p-3 leading-relaxed">
            {incident.aiSummary}
          </div>
        </div>
      </div>
    </div>
  );
}
