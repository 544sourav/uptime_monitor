import { useEffect, useState } from "react";
import api from "../service/api";
import { socket } from "../service/socket";
import type { Monitor } from "../types/Monitor";
import { useAuth } from "@clerk/clerk-react";

export function useMonitors() {
  const { getToken } = useAuth();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const token = await getToken();
        const res = await api.get("/monitors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMonitors(res.data.data);
      } catch (err) {
        console.error("Failed to fetch monitors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMonitors();
  }, [getToken]);

  useEffect(() => {
    const handleUpdate = (data: {
      monitorId: string;
      status: "up" | "down";
    }) => {
      setMonitors((prev) =>
        prev.map((m) =>
          m._id === data.monitorId ? { ...m, status: data.status } : m,
        ),
      );
    };
    socket.on("monitor-update", handleUpdate);
    return () => {
      socket.off("monitor-update", handleUpdate);
    };
  }, []);

  const createMonitor = async (
    name: string,
    url: string,
    intervalSecond: number,
  ) => {
    const token = await getToken();
    const res = await api.post(
      "/monitors",
      { name, url, intervalSecond },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setMonitors((prev) => [res.data, ...prev]);
  };

  return { monitors, loading, createMonitor };
}
