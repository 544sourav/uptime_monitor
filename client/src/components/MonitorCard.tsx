import type { Monitor } from "../types/Monitor";

interface Props {
  monitor: Monitor;
}

export default function MonitorCard({ monitor }: Props) {
  const statusColor =
    monitor.status === "up"
      ? "green"
      : monitor.status === "down"
        ? "red"
        : "gray";

  return (
    <li>
      <strong>{monitor.name}</strong> — {monitor.url} —{" "}
      <span style={{ color: statusColor }}>{monitor.status.toUpperCase()}</span>
    </li>
  );
}
