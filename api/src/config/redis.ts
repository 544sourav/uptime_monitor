import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
});

export const subscriberConnection = new IORedis(
  process.env.REDIS_URL as string,
  {
    maxRetriesPerRequest: null,
  },
);