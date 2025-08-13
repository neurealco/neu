"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get apiRateLimiter () {
        return apiRateLimiter;
    },
    get authRateLimiter () {
        return authRateLimiter;
    },
    get rateLimitMiddleware () {
        return rateLimitMiddleware;
    }
});
const _ratelimiterflexible = require("rate-limiter-flexible");
const _cacheutil = require("./cache.util");
const apiRateLimiter = new _ratelimiterflexible.RateLimiterRedis({
    storeClient: _cacheutil.redisClient,
    keyPrefix: 'rl_api',
    points: 100,
    duration: 60,
    blockDuration: 60 * 5 // block for 5 minutes
});
const authRateLimiter = new _ratelimiterflexible.RateLimiterRedis({
    storeClient: _cacheutil.redisClient,
    keyPrefix: 'rl_auth',
    points: 10,
    duration: 60,
    blockDuration: 60 * 15 // block for 15 minutes
});
const rateLimitMiddleware = (limiter)=>{
    return async (req, res, next)=>{
        try {
            const key = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            await limiter.consume(key);
            next();
        } catch (rlRejected) {
            res.status(429).send('Too Many Requests');
        }
    };
};
