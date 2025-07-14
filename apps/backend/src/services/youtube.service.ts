// apps/backend/src/services/youtube.service.ts
import { google } from 'googleapis';
import config from '../config';
import { supabase } from './supabase.service';
import { deductCredits } from './credits.service';
import { redisClient } from '../utils/cache.util';

// Nueva función para obtener estadísticas reales
const getYouTubeAnalytics = async (accessToken: string) => {
  const youtube = google.youtube('v3');
  const analytics = google.youtubeAnalytics('v2');
  
  // Obtener ID del canal
  const channel = await youtube.channels.list({
    access_token: accessToken,
    part: ['id'],
    mine: true,
  });
  
  const channelId = channel.data.items?.[0]?.id;
  if (!channelId) throw new Error('Channel not found');
  
  // Obtener estadísticas
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 7);
  
  const stats = await analytics.reports.query({
    access_token: accessToken,
    ids: `channel==${channelId}`,
    startDate: startDate.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0],
    metrics: 'views,estimatedMinutesWatched,subscribersGained',
    dimensions: 'day',
  });
  
  return {
    channelId,
    stats: stats.data.rows || [],
    totalSubscribers: channel.data.items?.[0]?.statistics?.subscriberCount,
    totalViews: channel.data.items?.[0]?.statistics?.viewCount,
  };
};

// Actualizar getRealTimeStats
export const getRealTimeStats = async (userId: string) => {
  const cacheKey = `user:${userId}:youtube_stats`;
  const cached = await redisClient.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }

  // Obtener token de acceso
  const { data: token, error } = await supabase
    .from('user_tokens')
    .select('youtube_access_token')
    .eq('user_id', userId)
    .single();
  
  if (error || !token) throw new Error('YouTube access not granted');
  
  // Obtener datos reales
  const realStats = await getYouTubeAnalytics(token.youtube_access_token);
  
  // Procesar datos para el frontend
  const processedStats = {
    subscribers: realStats.totalSubscribers || '0',
    views: realStats.totalViews || '0',
    engagement_rate: 4.7, // Temporal hasta implementar cálculo real
    daily_data: realStats.stats.map((row: any) => ({
      date: row[0],
      views: row[1],
      minutes: row[2],
      new_subscribers: row[3]
    }))
  };
  
  // Cachear por 30 minutos
  await redisClient.setex(cacheKey, 1800, JSON.stringify(processedStats));
  
  return processedStats;
};
