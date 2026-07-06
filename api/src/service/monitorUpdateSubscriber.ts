
import { Server } from "socket.io"
import { subscriberConnection } from "../config/redis"

export const startMonitorUpdateSubscriber = (io:Server)=>{
     subscriberConnection.subscribe("monitor-updates",(err)=>{
        if(err)console.log("Failed to subscribe:", err)
        else console.log("Subscribed to monitor-updates channel")
     })
    
    subscriberConnection.on("message",(channel,message)=>{
        if(channel=== "monitor-updates"){
            const data  = JSON.parse(message);
            io.to(data.userId).emit("monitor-update", data);
        }
    })
}
