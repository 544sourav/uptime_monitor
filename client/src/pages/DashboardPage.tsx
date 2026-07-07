import MonitorList from "../components/MonitorList";
import MonitorForm from "../components/MonitorForm";
import { useMonitors } from "../hooks/useMonitors";

export default function DashboardPage() {
  const { monitors, loading, createMonitor ,updateMonitor,deleteMonitor } = useMonitors();

  return (
    <div className="flex flex-col bg-slate-950 h-[calc(100vh-3.8rem)]">
      <MonitorForm onCreate={createMonitor} />
      <MonitorList
        monitors={monitors}
        loading={loading}
        updateMonitor={updateMonitor}
        deleteMonitor={deleteMonitor}
      />
    </div>
  );
}
