import axios from "axios";

import {Job} from "bullmq"
import Monitor from "../models/Monitor";
import { sendDownAlert } from "../util/mailer";
import Incident from "../models/Incident";
import { generateIncidentSummary } from "../util/aiSummary";
import { publishMonitorUpdate } from "../service/publisher";

const FAILURE_THRESHOLD =3;

export const pingProcessor = async(job: Job)=>{
    const {monitorId} = job.data;
    const monitor = await Monitor.findById(monitorId);
    if(!monitor){
        console.log(`Monitor ${monitorId}  no longer exist ,Skipping`);
        return;
    }

    const previousStatus = monitor.status;

    const startTime = Date.now();
    let isUp = false;
    let errorDetail = "";

    try {
        const response = await axios.get(monitor.url, { timeout: 10000 });
        isUp = response.status >= 200 && response.status < 400;
    } catch (err: any) {
        isUp = false;
        if (err.code === "ECONNABORTED") errorDetail = "Request timed out";
        else if (err.code === "ENOTFOUND")
        errorDetail = "DNS lookup failed — domain unreachable";
        else if (err.response)
        errorDetail = `Server responded with status ${err.response.status}`;
        else errorDetail = err.message || "Unknown network error";
    }

    const responseTime = Date.now() - startTime;

    if(isUp){
        await Monitor.findByIdAndUpdate(monitor._id, {
        status: "up",
        consecutiveFailures: 0,
        lastCheckedAt: new Date(),
        });
        await publishMonitorUpdate({
          monitorId: monitor._id,
          status: "up",
          userId: monitor.userId,
        });
        if (previousStatus === "down") {
          const incident = await Incident.findOne({
            monitorId: monitor._id,
            status: "ongoing",
          });
          if (incident) {
            incident.status = "resolved";
            incident.resolvedAt = new Date();
            await incident.save();
            console.log(`Incident resolved for ${monitor.name}`);
          }
        }

    }
    else {
        const updated = await Monitor.findByIdAndUpdate(
          monitor._id,
          { $inc: { consecutiveFailures: 1 }, lastCheckedAt: new Date() },
          { new: true },
        );

        if(updated && updated.consecutiveFailures >= FAILURE_THRESHOLD){

            const transitioned = await Monitor.findOneAndUpdate(
              { _id: monitor._id, status: { $ne: "down" } },
              { status: "down" },
              { new: true },
            );
            
            if (transitioned) {
              await publishMonitorUpdate({
                monitorId: monitor._id,
                status: "down",
                userId: transitioned.userId,
              });
              console.log(
                `ALERT: ${monitor.name} is DOWN after ${monitor.consecutiveFailures} failures`,
              );
              await sendDownAlert(
                transitioned.name,
                transitioned.url,
                transitioned.consecutiveFailures,
                transitioned.userEmail,
              );
              const pastIncidentCount = await Incident.countDocuments({
                monitorId: monitor._id,
                status: "resolved",
              });
              const summary = await generateIncidentSummary(
                transitioned.name,
                transitioned.url,
                errorDetail,
                pastIncidentCount,
              );
              await Incident.create({
                monitorId: monitor._id,
                monitorName: transitioned.name,
                url: transitioned.url,
                startedAt: new Date(),
                status: "ongoing",
                aiSummary: summary,
                errorDetail,
              });
            }
        }
    }

    console.log(
       `Checked ${monitor.name} (${monitor.url}) — ${isUp ? "UP" : "DOWN"} — ${responseTime}ms`,
    );
}