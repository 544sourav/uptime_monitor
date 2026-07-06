import dotenv from "dotenv"

dotenv.config();

import { connectDB } from "./config/database";
import { pingWorker } from "./worker/pingWorker";
import { scheduleAllMonitors } from "./queues/scheduler";

async function start(){
    await connectDB();
    // await scheduleAllMonitors();
    console.log("Worker is running and listening for jobs...");
}

start();

void pingWorker;