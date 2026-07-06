import { pingQueue } from "../queues/pingQueue";

export const removeMonitorSchedule = async (
  monitorId: string,
  intervalSecond: number,
) => {
  await pingQueue.removeRepeatable(
    "ping",
    { every: intervalSecond * 1000 },
    `monitor-${monitorId}`,
  );
};

export const addMonitorSchedule = async (
  monitorId: string,
  intervalSecond: number,
) => {
  await pingQueue.add(
    "ping",
    { monitorId },
    {
      repeat: { every: intervalSecond * 1000 },
      jobId: `monitor-${monitorId}`,
    },
  );
};
