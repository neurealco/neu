import { google } from 'googleapis';
import config from '../config';
import { supabase } from './supabase.service';
import { deductCredits } from './credits.service';

// Obtener estadísticas del canal
export const getYouTubeStats = async (userId: string) => {
  // Verificar créditos (50 créditos por consulta)
  await deductCredits(userId, 50);
  
  // Obtener token de acceso
  const { data: token, error } = await supabase
    .from('user_tokens')
    .select('youtube_access_token')
    .eq('user_id', userId)
    .single();
  
  if (error || !token) throw new Error('YouTube access not granted');
  
  // Consultar API de YouTube
  const youtube = google.youtube('v3');
  const res = await youtube.channels.list({
    access_token: token.youtube_access_token,
    part: ['snippet', 'statistics'],
    mine: true,
  });
  
  if (!res.data.items || res.data.items.length === 0) {
    throw new Error('YouTube channel not found');
  }
  
  const channel = res.data.items[0];
  return {
    id: channel.id,
    title: channel.snippet?.title,
    subscribers: channel.statistics?.subscriberCount,
    views: channel.statistics?.viewCount,
    videos: channel.statistics?.videoCount,
    thumbnail: channel.snippet?.thumbnails?.default?.url,
  };
};

// Obtener estadísticas en tiempo real
export const getRealTimeStats = async (userId: string) => {
  const stats = await getYouTubeStats(userId);
  
  // Datos adicionales (ejemplo simplificado)
  return {
    ...stats,
    views_today: Math.round(parseInt(stats.views || '0') * 0.01),
    estimated_revenue: Math.round(parseInt(stats.views || '0') * 0.05),
    engagement_rate: 4.7
  };
};