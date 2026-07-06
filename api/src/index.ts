import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import monitorRoutes from "./routes/monitorRoutes"
import {Server} from "socket.io";
import * as http from "http";
import { setupSocket } from "./socket";
import cors from "cors";
import { startMonitorUpdateSubscriber } from "./service/monitorUpdateSubscriber";
import { clerkMiddleware } from "@clerk/express";
dotenv.config();


const app = express();
app.use(cors())
const httpServer = http.createServer(app);

const io = new Server(httpServer,{
  cors:{origin: "*"}
})
setupSocket(io)
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("api is live");
});
app.use("/api/monitors", monitorRoutes);
async function startServer() {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
  startMonitorUpdateSubscriber(io);
}

startServer();
