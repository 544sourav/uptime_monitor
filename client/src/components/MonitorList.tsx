import type { Monitor } from "../types/Monitor";
import MonitorCard from "./MonitorCard";


interface Props {
  monitors: Monitor[];
  loading: boolean;
  updateMonitor: (
    id: string,
    name: string,
    url: string,
    intervalSecond: number,
  ) => Promise<void>;
  deleteMonitor: (id: string) => Promise<void>;
}

export default function MonitorList({ monitors, loading, updateMonitor,deleteMonitor }: Props) {
  if (loading) return <p className="text-white">Loading monitors...</p>;

  if (monitors.length === 0)
    return <p className="text-white">No monitors yet.</p>;

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center bg-slate-800 px-6 py-4 text-white font-bold">
          <div className="flex-[1.5]">Monitor Name</div>
          <div className="flex-[2]">URL</div>
          <div className="flex-1 text-center">Live Status</div>
          <div className="w-28 text-center">Action</div>
        </div>

        {monitors.map((monitor) => (
          <MonitorCard
            key={monitor._id}
            monitor={monitor}
            updateMonitor={updateMonitor}
            deleteMonitor={deleteMonitor}
          />
        ))}
      </div>
    </div>
  );
}
