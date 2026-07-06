import type { Monitor } from "../types/Monitor";
import MonitorCard from "./MonitorCard";


interface Props {
  monitors: Monitor[];
  loading: boolean;
}

export default function MonitorList({ monitors, loading }: Props) {
  if (loading) return <p>Loading monitors...</p>;
  if (monitors.length === 0) return <p>No monitors yet.</p>;

  return (
    <ul>
      {monitors.map((monitor) => (
        <MonitorCard key={monitor._id} monitor={monitor} />
      ))}
    </ul>
  );
}
