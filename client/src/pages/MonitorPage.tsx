import { useEffect, useState } from "react"
import type { Monitor } from "../types/Monitor";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import api from "../service/api";
import type { Incident } from "../types/Incident";
import { Loading } from "../components/loading";
import MonitorDetailsCard from "../components/MonitorDetailsCard";
import IncidentCard from "../components/IncidentCard";

export const MonitorPage =()=>{
    const { getToken } = useAuth();
    const [monitor, setMonitor] = useState<Monitor | null>(null);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading,setLoading] = useState(true);

    const { id } = useParams<{ id: string }>();

    const getMonitorById = async () => {
      try {
        const token = await getToken();

        const res = await api.get(`/monitors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMonitor(res.data.data.monitor);
        setIncidents(res.data.data.incidents);
        // console.log("res.data.data.monitor", res.data.data.monitor);
        // console.log("res.data.data.incidents", res.data.data.incidents);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (id) {
        getMonitorById();
      }
    }, [id]);

    if(loading){
        return (
          <div className="h-[calc(100vh-3.8rem)] flex items-center justify-center w-full">
            <Loading message="loading monitor" />
          </div>
        );
    }
    if (!monitor) return (
      <div className="h-[calc(100vh-3.8rem)] flex items-center justify-center w-full">
        <p>No Data Found</p>
      </div>
    );

    return (
      <div className="mx-auto max-w-5xl space-y-8 p-6 ">
        {monitor && <MonitorDetailsCard monitor={monitor} />}

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">
            Recent Incidents
          </h2>

          {incidents.length === 0 ? (
            <p className="text-slate-400">No incidents found.</p>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident._id} incident={incident} />
              ))}
            </div>
          )}
        </div>
      </div>
    );

}