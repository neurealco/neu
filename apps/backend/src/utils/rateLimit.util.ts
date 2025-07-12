import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient } from './cache.util';
import config from '../config';

export const apiRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl_api',
  points: 100, // 100 requests
  duration: 60, // per 1 minute
  blockDuration: 60 * 5 // block for 5 minutes
});

export const authRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl_auth',
  points: 10, // 10 requests
  duration: 60, // per 1 minute
  blockDuration: 60 * 15 // block for 15 minutes
});

export const rateLimitMiddleware = (limiter: RateLimiterRedis) => {
  return async (req: any, res: any, next: any) => {
    try {
      const key = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      await limiter.consume(key);
      next();
    } catch (rlRejected) {
      res.status(429).send('Too Many Requests');
    }
  };
};