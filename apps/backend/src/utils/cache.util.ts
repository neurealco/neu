import Redis from 'ioredis';
import config from '../config';

const redis = new Redis(config.REDIS_URL);

export const initCache = async () => {
  try {
    await redis.ping();
    console.log('🚀 Redis connected successfully');
    return redis;
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

export const getCache = async (key: string) => {
  return redis.get(key);
};

export const setCache = async (key: string, value: any, ttl: number = config.CACHE_TTL) => {
  if (ttl > 0) {
    return redis.setex(key, ttl, JSON.stringify(value));
  }
  return redis.set(key, JSON.stringify(value));
};

export const deleteCache = async (key: string) => {
  return redis.del(key);
};

export const clearPattern = async (pattern: string) => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    return redis.del(...keys);
  }
};

export const redisClient = redis;