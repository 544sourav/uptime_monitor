import { publisher } from "../config/redis";


export const publishMonitorUpdate = async(data:object)=>{
    await publisher.publish("monitor-updates",JSON.stringify(data));
}