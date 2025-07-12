import { supabase } from './supabase.service';
import { redisClient } from '../utils/cache.util';

export const addCredits = async (userId: string, amount: number) => {
  // Actualizar créditos en Supabase
  const { error } = await supabase.rpc('add_credits', {
    user_id: userId,
    credit_amount: amount
  });
  
  if (error) throw new Error(error.message);
  
  // Actualizar caché
  const cacheKey = `user:${userId}:credits`;
  const current = await redisClient.get(cacheKey);
  await redisClient.set(cacheKey, (parseInt(current || '0') + amount);
};

export const deductCredits = async (userId: string, amount: number) => {
  // Verificar saldo primero
  const credits = await getUserCredits(userId);
  if (credits < amount) {
    throw new Error('Insufficient credits');
  }
  
  // Actualizar en Supabase
  const { error } = await supabase.rpc('deduct_credits', {
    user_id: userId,
    credit_amount: amount
  });
  
  if (error) throw new Error(error.message);
  
  // Actualizar caché
  const cacheKey = `user:${userId}:credits`;
  await redisClient.set(cacheKey, credits - amount);
};

export const getUserCredits = async (userId: string) => {
  // Intentar obtener de caché
  const cacheKey = `user:${userId}:credits`;
  const cached = await redisClient.get(cacheKey);
  
  if (cached) return parseInt(cached);
  
  // Obtener de base de datos
  const { data, error } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  
  // Almacenar en caché (5 minutos)
  await redisClient.setex(cacheKey, 300, data?.credits || 0);
  
  return data?.credits || 0;
};