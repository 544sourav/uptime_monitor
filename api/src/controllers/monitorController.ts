import { Request, Response } from "express";
import Monitor from "../models/Monitor";
import { pingQueue } from "../queues/pingQueue";
import { addMonitorSchedule, removeMonitorSchedule } from "../utils/scheduling";
import { clerkClient } from "@clerk/express";

export const createMonitor = async (req: Request, res: Response) => {
  try {
    const { name, url, intervalSecond } = req.body;
    const userId = (req as any).userId;
    // console.log(name, url, intervalSecond, userId);

    if (!name || !url) {
      return res.status(400).json({
        success: false,
        message: "Name and URL are required",
      });
    }

    const exists = await Monitor.findOne({ url:url ,userId });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Monitor already exists",
      });
    }
    const user = await clerkClient.users.getUser(userId);
    const userEmail = user.primaryEmailAddress?.emailAddress;
    console.log("email", userId, userEmail, name, url, intervalSecond);
    if (!userEmail) {
      return res.status(400).json({ message: "Could not resolve user email" });
    }
    const monitor = await Monitor.create({
      userId,
      userEmail,
      name,
      url,
      intervalSecond,
    });
    console.log(monitor)
    // await pingQueue.add(
    //   "ping",
    //   {monitorId:monitor._id},
    //   {
    //     repeat: {every: monitor.intervalSecond *1000},
    //     jobId: `monitor-${monitor._id}`,
    //   }
    // )
    await addMonitorSchedule(monitor._id.toString(), monitor.intervalSecond);
    return res.status(201).json({
      success: true,
      message: "Monitor created successfully",
      data: monitor,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create monitor",
      error: err,
    });
  }
};

export const getMonitors = async (req: Request, res: Response) => {
  try {
     const userId = (req as any).userId;
    const monitors = await Monitor.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "fetched successfully",
      data: monitors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Monitor",
      error: err,
    });
  }
};

export const getMonitorById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = (req as any).userId;
    const monitor = await Monitor.findById({ _id:id, userId });
    if (!monitor) {
      return res.status(404).json({
        success: false,
        message: "Monitor not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetch successful",
      data: monitor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Monitor",
    });
  }
};

export const deleteMonitor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = (req as any).userId;
    const monitor = await Monitor.findByIdAndDelete({_id:id,userId});
    if (!monitor) {
      return res.status(404).json({
        success: false,
        message: "Monitor not found",
      });
    }

    await removeMonitorSchedule(
      monitor._id.toString(),
      monitor.intervalSecond,
    );
     const repeatableJobs = await pingQueue.getRepeatableJobs();
    //  console.log("repeatableJobs", repeatableJobs);
    return res.status(200).json({
      success: true,
      message: "Delete successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get Monitor",
    });
  }
};

export const updateMonitor = async (req: Request, res: Response) => {
  try {
    const { name, url, intervalSecond } = req.body;
    const userId = (req as any).userId;
    const oldMonitor = await Monitor.findById({ _id: req.params.id, userId });
    if (!oldMonitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

   
    await removeMonitorSchedule(
      oldMonitor._id.toString(),
      oldMonitor.intervalSecond,
    );

    const monitor = await Monitor.findByIdAndUpdate(
      { _id: req.params.id, userId },
      { name, url, intervalSecond },
      { new: true, runValidators: true },
    );

    if (!monitor) {
      return res.status(404).json({
         success:false,
         message: "Monitor not found" 
        });
    }

   
    // const existing = repeatableJobs.find((job)=>job.id ===`monitor-${monitor._id}`);
    // console.log("exist",existing);
    // if(existing){
    //   await pingQueue.removeRepeatableByKey(existing.key);
    // }

    // await pingQueue.add(
    //   "ping",
    //   { monitorId: monitor._id },
    //   {
    //     repeat: { every: monitor.intervalSecond * 1000 },
    //     jobId: `monitor-${monitor._id}`,
    //   },
    // );

    await addMonitorSchedule(monitor._id.toString(), monitor.intervalSecond);

     const repeatableJobs = await pingQueue.getRepeatableJobs();
    //  console.log("repeatableJobs", repeatableJobs);

    return res.status(200).json({
        success:true,
        messaage:"update successful",
        data:monitor
    });
  } catch (err) {
    return res.status(500).json({ 
        success:false,
        message: "Failed to update monitor", 
        error: err 
    });
  }
};