import MonitorList from "../components/MonitorList";
import MonitorForm from "../components/MonitorForm";
import { useMonitors } from "../hooks/useMonitors";
import { Loading } from "../components/loading";

export default function DashboardPage() {
  const {
    monitors,
    loading,
    isMutating,
    createMonitor,
    updateMonitor,
    deleteMonitor,
  } = useMonitors();

  return (
    <div className="relative flex h-[calc(100vh-3.8rem)] flex-col bg-slate-950">
      {(loading || isMutating) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center  backdrop-blur-sm">
          <Loading
            message={loading ? "Loading monitors..." : "Saving changes..."}
            fullScreen={false}
          />
        </div>
      )}

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
