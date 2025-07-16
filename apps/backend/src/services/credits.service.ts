import { supabase } from "./supabase.service";
import { redisClient } from "../utils/cache.util";

export const addCredits = async (userId: string, amount: number, reason: string) => {
  const { error } = await supabase.rpc("add_credits", {
    user_id: userId,
    credit_amount: amount,
  });

  if (error) throw new Error(error.message);

  const cacheKey = `user:${userId}:credits`;
  const current = await redisClient.get(cacheKey);
  await redisClient.set(cacheKey, parseInt(current || "0") + amount);
};

export const deductCredits = async (userId: string, amount: number, reason: string) => {
  const credits = await getUserCredits(userId);
  if (credits < amount) throw new Error("Insufficient credits");

  const { error } = await supabase.rpc("deduct_credits", {
    user_id: userId,
    credit_amount: amount,
  });

  if (error) throw new Error(error.message);

  const cacheKey = `user:${userId}:credits`;
  await redisClient.set(cacheKey, credits - amount);
};

export const getUserCredits = async (userId: string) => {
  const cacheKey = `user:${userId}:credits`;
  const cached = await redisClient.get(cacheKey);
  if (cached) return parseInt(cached);

  const { data, error } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  await redisClient.setex(cacheKey, 300, data?.credits || 0);
  return data?.credits || 0;
};