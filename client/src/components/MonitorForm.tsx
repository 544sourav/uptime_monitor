import { useState } from "react";
import { ErrorModal } from "./ErrorModal";

interface Props {
  onCreate: (
    name: string,
    url: string,
    intervalSecond: number,
  ) => Promise<void>;
}

export default function MonitorForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [intervalSecond, setIntervalSeconds] = useState(60);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onCreate(name, url, intervalSecond);

      setName("");
      setUrl("");
      setIntervalSeconds(60);
    } catch (err) {
      setError("Failed to create monitor. Check the URL and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3  border border-slate-800 bg-slate-900 p-4 shadow-lg md:flex-row md:items-center"
      >
        <input
          type="text"
          placeholder="Monitor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 md:flex-1"
        />

        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 md:flex-[2]"
        />

        <input
          type="number"
          min={10}
          value={intervalSecond}
          onChange={(e) => setIntervalSeconds(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 md:w-28 md:flex-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full whitespace-nowrap rounded-lg bg-blue-800 px-6 py-2.5 font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-blue-400 md:w-auto"
        >
          {submitting ? "Adding..." : "Add Monitor"}
        </button>
      </form>

      {/* Error Modal */}
      {error && <ErrorModal error={error} setError={setError} />}
    </>
  );
}
