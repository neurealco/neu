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
    get clearPattern () {
        return clearPattern;
    },
    get deleteCache () {
        return deleteCache;
    },
    get getCache () {
        return getCache;
    },
    get initCache () {
        return initCache;
    },
    get redisClient () {
        return redisClient;
    },
    get setCache () {
        return setCache;
    }
});
const _ioredis = /*#__PURE__*/ _interop_require_default(require("ioredis"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const redis = new _ioredis.default(_config.default.REDIS_URL);
const initCache = async ()=>{
    try {
        await redis.ping();
        console.log('🚀 Redis connected successfully');
        return redis;
    } catch (error) {
        console.error('❌ Redis connection error:', error);
        process.exit(1);
    }
};
const getCache = async (key)=>{
    return redis.get(key);
};
const setCache = async (key, value, ttl = _config.default.CACHE_TTL)=>{
    if (ttl > 0) {
        return redis.setex(key, ttl, JSON.stringify(value));
    }
    return redis.set(key, JSON.stringify(value));
};
const deleteCache = async (key)=>{
    return redis.del(key);
};
const clearPattern = async (pattern)=>{
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
        return redis.del(...keys);
    }
};
const redisClient = redis;
