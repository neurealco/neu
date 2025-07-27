"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = exports.authRateLimiter = exports.apiRateLimiter = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const cache_util_1 = require("./cache.util");
exports.apiRateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: cache_util_1.redisClient,
    keyPrefix: 'rl_api',
    points: 100, // 100 requests
    duration: 60, // per 1 minute
    blockDuration: 60 * 5 // block for 5 minutes
});
exports.authRateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: cache_util_1.redisClient,
    keyPrefix: 'rl_auth',
    points: 10, // 10 requests
    duration: 60, // per 1 minute
    blockDuration: 60 * 15 // block for 15 minutes
});
const rateLimitMiddleware = (limiter) => {
    return async (req, res, next) => {
        try {
            const key = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            await limiter.consume(key);
            next();
        }
        catch (rlRejected) {
            res.status(429).send('Too Many Requests');
        }
    };
};
exports.rateLimitMiddleware = rateLimitMiddleware;
