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
    get getBasicStats () {
        return getBasicStats;
    },
    get getRealTimeStats () {
        return getRealTimeStats;
    }
});
const _googleapis = require("googleapis");
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
const _supabaseservice = require("./supabase.service");
const _cacheutil = require("../utils/cache.util");
const _usageservice = require("./usage.service");
const _errormiddleware = require("../middleware/error.middleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Configuración de OAuth2
const oauth2Client = new _googleapis.google.auth.OAuth2(_config.default.GOOGLE_CLIENT_ID, _config.default.GOOGLE_CLIENT_SECRET);
// Función para refrescar token de acceso si es necesario
const refreshTokenIfNeeded = async (userId, tokenData)=>{
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;
    if (tokenData.expiry_date && now + FIVE_MINUTES > tokenData.expiry_date) {
        oauth2Client.setCredentials({
            refresh_token: tokenData.refresh_token
        });
        const { credentials } = await oauth2Client.refreshAccessToken();
        // Actualizar en base de datos
        await _supabaseservice.supabase.from('youtube_tokens').update({
            access_token: credentials.access_token,
            expiry_date: credentials.expiry_date
        }).eq('user_id', userId);
        return credentials.access_token;
    }
    return tokenData.access_token;
};
const getRealTimeStats = async (userId, forceRefresh = false)=>{
    const cacheKey = `user:${userId}:youtube_stats`;
    // 1. Verificar caché si no es refresco forzado
    if (!forceRefresh) {
        const cached = await _cacheutil.redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);
    }
    // 2. Obtener token de la base de datos
    const { data: token, error } = await _supabaseservice.supabase.from('youtube_tokens').select('access_token, refresh_token, expiry_date').eq('user_id', userId).single();
    if (error || !token) {
        throw new Error('YouTube access not granted');
    }
    // 3. Refrescar token si es necesario
    const accessToken = await refreshTokenIfNeeded(userId, token);
    // 4. Si es un refresco forzado, verificar y aumentar el uso
    if (forceRefresh) {
        // Verificar límite de uso
        const { currentUsage, limit } = await (0, _usageservice.checkUsage)(userId, 'youtube_refresh');
        if (currentUsage >= limit) {
            throw new _errormiddleware.UsageLimitExceededError('youtube_refresh', limit, currentUsage);
        }
        // Incrementar el contador de uso
        await (0, _usageservice.incrementUsage)(userId, 'youtube_refresh');
    }
    // 5. Obtener datos del canal
    const youtube = _googleapis.google.youtube('v3');
    const channelRes = await youtube.channels.list({
        access_token: accessToken,
        part: [
            'snippet',
            'statistics'
        ],
        mine: true
    });
    if (!channelRes.data.items || channelRes.data.items.length === 0) {
        throw new Error('YouTube channel not found');
    }
    const channel = channelRes.data.items[0];
    const channelId = channel.id;
    // 6. Obtener analíticas de los últimos 7 días
    const analytics = _googleapis.google.youtubeAnalytics('v2');
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
        sort: 'day'
    });
    // 7. Procesar datos para respuesta
    const statsData = {
        channelId,
        channelTitle: channel.snippet?.title || '',
        thumbnail: channel.snippet?.thumbnails?.default?.url || '',
        subscribers: channel.statistics?.subscriberCount || '0',
        views: channel.statistics?.viewCount || '0',
        videos: channel.statistics?.videoCount || '0',
        dailyStats: statsRes.data.rows?.map((row)=>({
                date: row[0],
                views: row[1] || '0',
                minutesWatched: row[2] || '0',
                newSubscribers: row[3] || '0'
            })) || []
    };
    // 8. Cachear resultados por 30 minutos
    await _cacheutil.redisClient.setex(cacheKey, 1800, JSON.stringify(statsData));
    return statsData;
};
const getBasicStats = async (userId)=>{
    return getRealTimeStats(userId, false);
};
