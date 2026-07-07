import { useState } from "react";
import type { Monitor } from "../types/Monitor";

interface Props {
  monitor: Monitor;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  updateMonitor: (
    id: string,
    name: string,
    url: string,
    intervalSecond: number,
  ) => Promise<void>;

  deleteMonitor: (id: string) => Promise<void>;
}

export const ActionModal = ({
  monitor,
  setOpen,
  updateMonitor,
  deleteMonitor,
}: Props) => {
  const [name, setName] = useState(monitor.name);
  const [url, setUrl] = useState(monitor.url);
  const [intervalSecond, setIntervalSecond] = useState(monitor.intervalSecond);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await updateMonitor(monitor._id, name, url, intervalSecond);

      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update monitor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this monitor?",
    );

    if (!confirmDelete) return;

    try {
      setSubmitting(true);
      setError("");

      await deleteMonitor(monitor._id);

      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete monitor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <h2 className="mb-5 text-xl font-semibold text-white">Edit Monitor</h2>

        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />

          <input
            type="number"
            min={10}
            value={intervalSecond}
            onChange={(e) => setIntervalSecond(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-800 px-5 py-2 text-white hover:bg-blue-900 disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
