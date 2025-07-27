"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.clearPattern = exports.deleteCache = exports.setCache = exports.getCache = exports.initCache = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
const redis = new ioredis_1.default(config_1.default.REDIS_URL);
const initCache = async () => {
    try {
        await redis.ping();
        console.log('🚀 Redis connected successfully');
        return redis;
    }
    catch (error) {
        console.error('❌ Redis connection error:', error);
        process.exit(1);
    }
};
exports.initCache = initCache;
const getCache = async (key) => {
    return redis.get(key);
};
exports.getCache = getCache;
const setCache = async (key, value, ttl = config_1.default.CACHE_TTL) => {
    if (ttl > 0) {
        return redis.setex(key, ttl, JSON.stringify(value));
    }
    return redis.set(key, JSON.stringify(value));
};
exports.setCache = setCache;
const deleteCache = async (key) => {
    return redis.del(key);
};
exports.deleteCache = deleteCache;
const clearPattern = async (pattern) => {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
        return redis.del(...keys);
    }
};
exports.clearPattern = clearPattern;
exports.redisClient = redis;
