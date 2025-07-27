"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCredits = exports.deductCredits = exports.addCredits = void 0;
const supabase_service_1 = require("./supabase.service");
const cache_util_1 = require("../utils/cache.util");
const addCredits = async (userId, amount, reason) => {
    const { error } = await supabase_service_1.supabase.rpc("add_credits", {
        user_id: userId,
        credit_amount: amount,
    });
    if (error)
        throw new Error(error.message);
    const cacheKey = `user:${userId}:credits`;
    const current = await cache_util_1.redisClient.get(cacheKey);
    await cache_util_1.redisClient.set(cacheKey, parseInt(current || "0") + amount);
};
exports.addCredits = addCredits;
const deductCredits = async (userId, amount, reason) => {
    const credits = await (0, exports.getUserCredits)(userId);
    if (credits < amount)
        throw new Error("Insufficient credits");
    const { error } = await supabase_service_1.supabase.rpc("deduct_credits", {
        user_id: userId,
        credit_amount: amount,
    });
    if (error)
        throw new Error(error.message);
    const cacheKey = `user:${userId}:credits`;
    await cache_util_1.redisClient.set(cacheKey, credits - amount);
};
exports.deductCredits = deductCredits;
const getUserCredits = async (userId) => {
    const cacheKey = `user:${userId}:credits`;
    const cached = await cache_util_1.redisClient.get(cacheKey);
    if (cached)
        return parseInt(cached);
    const { data, error } = await supabase_service_1.supabase
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();
    if (error)
        throw new Error(error.message);
    await cache_util_1.redisClient.setex(cacheKey, 300, data?.credits || 0);
    return data?.credits || 0;
};
exports.getUserCredits = getUserCredits;
