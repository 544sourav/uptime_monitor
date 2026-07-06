import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}
    >
      <input
        placeholder="Monitor name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="number"
        min={10}
        value={intervalSecond}
        onChange={(e) => setIntervalSeconds(Number(e.target.value))}
        style={{ width: "80px" }}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Monitor"}
      </button>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
}
