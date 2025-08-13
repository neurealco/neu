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
    get getDashboardData () {
        return getDashboardData;
    },
    get refreshStats () {
        return refreshStats;
    }
});
const _youtubeservice = require("../services/youtube.service");
const _supabaseservice = require("../services/supabase.service");
const _usageservice = require("../services/usage.service");
const _errormiddleware = require("../middleware/error.middleware");
const getDashboardData = async (req, res)=>{
    try {
        // Verificar que el usuario está autenticado (req.user ahora es reconocido)
        if (!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            });
        }
        const userId = req.user.id;
        const stats = await (0, _youtubeservice.getBasicStats)(userId);
        // Obtener información del usuario
        const { data: user, error: userError } = await _supabaseservice.supabase.from('profiles').select('subscription_plan, trial_ends_at').eq('id', userId).single();
        if (userError || !user) {
            throw new Error('User profile not found');
        }
        // Obtener los usos actuales
        const [youtubeUsage, aiUsage] = await Promise.all([
            (0, _usageservice.checkUsage)(userId, 'youtube_refresh'),
            (0, _usageservice.checkUsage)(userId, 'ai_chat')
        ]);
        res.json({
            youtube: stats,
            usage: {
                youtube_refresh: {
                    current: youtubeUsage.currentUsage,
                    limit: youtubeUsage.limit
                },
                ai_chat: {
                    current: aiUsage.currentUsage,
                    limit: aiUsage.limit
                }
            },
            subscription: {
                plan: user.subscription_plan,
                trial_ends_at: user.trial_ends_at
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const refreshStats = async (req, res)=>{
    try {
        // req.user ahora es reconocido por TypeScript
        if (!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            });
        }
        const stats = await (0, _youtubeservice.getRealTimeStats)(req.user.id, true);
        res.json(stats);
    } catch (error) {
        if (error instanceof _errormiddleware.UsageLimitExceededError) {
            return res.status(429).json({
                error: 'Monthly usage limit exceeded',
                feature: error.feature,
                limit: error.limit,
                current: error.current
            });
        }
        res.status(500).json({
            error: error.message
        });
    }
};
