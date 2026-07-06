
import {Server,Socket} from "socket.io"
import { verifyToken } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config()
export const setupSocket =(io:Server)=>{
    io.use(async(socket,next)=>{
        try{
            const token = socket.handshake.auth?.token;
            if(!token)return next(new Error("No Token Provided"));
            const payload =  await verifyToken(token , {
                secretKey: process.env.CLERK_SECRET_KEY
            });
            (socket as any).userId = payload.sub;
            next();
        }
        catch(err){
             next(new Error("Authentication failed"));
        }
    })
    io.on("connection",(socket:Socket)=>{
        const userId = (socket as any).userId;
        socket.join(userId);
        console.log(`Client connected: ${socket.id}, joined room: ${userId}`);console.log("Client Connected:",socket.id);
        socket.on("disconnect",()=>{
            console.log("client disconnected",socket.id)
        })
    })
}