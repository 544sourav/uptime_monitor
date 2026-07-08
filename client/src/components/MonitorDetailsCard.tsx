import type { Monitor } from "../types/Monitor";

interface Props {
  monitor: Monitor;
}

export default function MonitorDetailsCard({ monitor }: Props) {
  const statusColor =
    monitor.status === "up"
      ? "bg-green-500"
      : monitor.status === "down"
        ? "bg-red-500"
        : "bg-gray-500";

  return (
    <div className="rounded-xl bg-slate-900 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{monitor.name}</h2>

        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${statusColor}`} />
          <span className="uppercase">{monitor.status}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-slate-300">
        <p>
          <span className="font-semibold text-white">URL:</span> {monitor.url}
        </p>

        <p>
          <span className="font-semibold text-white">Interval:</span>{" "}
          {monitor.intervalSecond}s
        </p>

        <p>
          <span className="font-semibold text-white">Failures:</span>{" "}
          {monitor.consecutiveFailures}
        </p>

        <p>
          <span className="font-semibold text-white">Last Checked:</span>{" "}
          {monitor.lastCheckedAt ? new Date(monitor.lastCheckedAt).toLocaleString() : "Never"}
        </p>

        <p>
          <span className="font-semibold text-white">Created:</span>{" "}
          {monitor.createdAt ? new Date(monitor.createdAt).toLocaleString() : "Unknown"}
        </p>
      </div>
    </div>
  );
}
