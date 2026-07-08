import { useState } from "react";
import type { Monitor } from "../types/Monitor";
import { ActionModal } from "./ActionModal";
import { useNavigate } from "react-router-dom";

interface Props {
  monitor: Monitor;
  updateMonitor: (
    id: string,
    name: string,
    url: string,
    intervalSecond: number,
  ) => Promise<void>;
  deleteMonitor: (id: string) => Promise<void>;
}

export default function MonitorCard({ monitor ,updateMonitor, deleteMonitor }: Props) {
  const [open, setOpen] = useState(false);
  // const { updateMonitor, deleteMonitor } = useMonitors();
  const navigate = useNavigate()
  const statusColor =
    monitor.status === "up"
      ? "bg-green-500"
      : monitor.status === "down"
        ? "bg-red-500"
        : "bg-gray-500";

  return (
    <>
      <div className="flex items-center border-t border-slate-700 bg-slate-900 px-6 py-4 text-white" onClick={()=>navigate(`/${monitor._id}`)}>
        <div className="flex-[1.5] truncate font-medium">{monitor.name}</div>

        <div className="flex-[2] truncate text-slate-300">{monitor.url}</div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <span className={`h-3 w-3 rounded-full ${statusColor}`} />
          <span className="uppercase">{monitor.status}</span>
        </div>

        <div className="w-28 flex justify-center">
          <button
            onClick={(e) => {
                 e.stopPropagation(); 
               setOpen(true)
              }}
            className="rounded-md bg-blue-800 px-3 py-1.5 hover:bg-blue-900"
          >
            Action
          </button>
        </div>
      </div>

      {open && (
        <ActionModal
          monitor={monitor}
          setOpen={setOpen}
          updateMonitor={updateMonitor}
          deleteMonitor={deleteMonitor}
        />
      )}
    </>
  );
}
