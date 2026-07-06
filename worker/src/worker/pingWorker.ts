import { Worker } from "bullmq";
import { connection } from "../config/redis";
import { pingProcessor } from "../processors/pingProcessor";

export const pingWorker = new Worker ("ping-queue",pingProcessor,{
    connection :connection as any,
    concurrency:5,
})

pingWorker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});

pingWorker.on("failed",(job,err)=>{
    console.error(`Job ${job?.id} failed:`, err.message);
})