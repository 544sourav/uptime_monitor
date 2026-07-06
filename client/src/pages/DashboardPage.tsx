import MonitorList from "../components/MonitorList";
import MonitorForm from "../components/MonitorForm";
import { useMonitors } from "../hooks/useMonitors";

export default function DashboardPage() {
  const { monitors, loading, createMonitor } = useMonitors();

  return (
    <div>
      <MonitorForm onCreate={createMonitor} />
      <MonitorList monitors={monitors} loading={loading} />
    </div>
  );
}
