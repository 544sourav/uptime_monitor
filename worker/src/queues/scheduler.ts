import { pingQueue } from "./pingQueue";
import Monitor from "../models/Monitor";

export const scheduleAllMonitors =async()=>{
    const monitors= await Monitor.find();
    for(const monitor of monitors){
        await pingQueue.add(
          "ping",
          { monitorId: monitor._id },
          {
            repeat: { every: monitor.intervalSecond * 1000 },
            jobId: `monitor-${monitor._id}`
          },
        );
         console.log(
           `Scheduled: ${monitor.name} every ${monitor.intervalSecond}s`,
         );
    }
}