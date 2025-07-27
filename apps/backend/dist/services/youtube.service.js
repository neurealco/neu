"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasicStats = exports.getRealTimeStats = void 0;
// apps/backend/src/services/youtube.service.ts
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../config"));
const supabase_service_1 = require("./supabase.service");
const credits_service_1 = require("./credits.service");
const cache_util_1 = require("../utils/cache.util");
const error_middleware_1 = require("../middleware/error.middleware");
// Configuración de OAuth2
const oauth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.GOOGLE_CLIENT_ID, config_1.default.GOOGLE_CLIENT_SECRET);
// Función para refrescar token de acceso si es necesario
const refreshTokenIfNeeded = async (userId, tokenData) => {
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;
    if (tokenData.expiry_date && (now + FIVE_MINUTES) > tokenData.expiry_date) {
        oauth2Client.setCredentials({
            refresh_token: tokenData.refresh_token
        });
        const { credentials } = await oauth2Client.refreshAccessToken();
        // Actualizar en base de datos
        await supabase_service_1.supabase
            .from('youtube_tokens')
            .update({
            access_token: credentials.access_token,
            expiry_date: credentials.expiry_date
        })
            .eq('user_id', userId);
        return credentials.access_token;
    }
    return tokenData.access_token;
};
// Función principal para obtener estadísticas
const getRealTimeStats = async (userId, forceRefresh = false) => {
    const cacheKey = `user:${userId}:youtube_stats`;
    // 1. Verificar caché si no es refresco forzado
    if (!forceRefresh) {
        const cached = await cache_util_1.redisClient.get(cacheKey);
        if (cached)
            return JSON.parse(cached);
    }
    // 2. Obtener token de la base de datos
    const { data: token, error } = await supabase_service_1.supabase
        .from('youtube_tokens')
        .select('access_token, refresh_token, expiry_date')
        .eq('user_id', userId)
        .single();
    if (error || !token) {
        throw new Error('YouTube access not granted');
    }
    // 3. Refrescar token si es necesario
    const accessToken = await refreshTokenIfNeeded(userId, token);
    // 4. Solo deducir créditos si es refresco forzado
    if (forceRefresh) {
        try {
            await (0, credits_service_1.deductCredits)(userId, 50, 'Force refresh YouTube stats');
        }
        catch (error) {
            if (error instanceof error_middleware_1.InsufficientCreditsError) {
                throw error;
            }
            throw new Error('Failed to deduct credits');
        }
    }
    // 5. Obtener datos del canal
    const youtube = googleapis_1.google.youtube('v3');
    const channelRes = await youtube.channels.list({
        access_token: accessToken,
        part: ['snippet', 'statistics'],
        mine: true,
    });
    if (!channelRes.data.items || channelRes.data.items.length === 0) {
        throw new Error('YouTube channel not found');
    }
    const channel = channelRes.data.items[0];
    const channelId = channel.id;
    // 6. Obtener analíticas de los últimos 7 días
    const analytics = googleapis_1.google.youtubeAnalytics('v2');
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    const statsRes = await analytics.reports.query({
        access_token: accessToken,
        ids: `channel==${channelId}`,
        startDate: startDate.toISOString().split('T')[0],
        endDate: now.toISOString().split('T')[0],
        metrics: 'views,estimatedMinutesWatched,subscribersGained',
        dimensions: 'day',
        sort: 'day',
    });
    // 7. Procesar datos para respuesta
    const statsData = {
        channelId,
        channelTitle: channel.snippet?.title || '',
        thumbnail: channel.snippet?.thumbnails?.default?.url || '',
        subscribers: channel.statistics?.subscriberCount || '0',
        views: channel.statistics?.viewCount || '0',
        videos: channel.statistics?.videoCount || '0',
        dailyStats: statsRes.data.rows?.map(row => ({
            date: row[0],
            views: row[1] || '0',
            minutesWatched: row[2] || '0',
            newSubscribers: row[3] || '0'
        })) || []
    };
    // 8. Cachear resultados por 30 minutos
    await cache_util_1.redisClient.setex(cacheKey, 1800, JSON.stringify(statsData));
    return statsData;
};
exports.getRealTimeStats = getRealTimeStats;
// Función para obtener estadísticas básicas (sin forzar refresco)
const getBasicStats = async (userId) => {
    return (0, exports.getRealTimeStats)(userId, false);
};
exports.getBasicStats = getBasicStats;
