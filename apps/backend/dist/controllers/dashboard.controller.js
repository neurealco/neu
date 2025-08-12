"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshStats = exports.getDashboardData = void 0;
const youtube_service_1 = require("../services/youtube.service");
const supabase_service_1 = require("../services/supabase.service");
const usage_service_1 = require("../services/usage.service");
const error_middleware_1 = require("../middleware/error.middleware");
const getDashboardData = async (req, res) => {
    try {
        // Verificar que el usuario está autenticado (req.user ahora es reconocido)
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const userId = req.user.id;
        const stats = await (0, youtube_service_1.getBasicStats)(userId);
        // Obtener información del usuario
        const { data: user, error: userError } = await supabase_service_1.supabase
            .from('profiles')
            .select('subscription_plan, trial_ends_at')
            .eq('id', userId)
            .single();
        if (userError || !user) {
            throw new Error('User profile not found');
        }
        // Obtener los usos actuales
        const [youtubeUsage, aiUsage] = await Promise.all([
            (0, usage_service_1.checkUsage)(userId, 'youtube_refresh'),
            (0, usage_service_1.checkUsage)(userId, 'ai_chat')
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDashboardData = getDashboardData;
const refreshStats = async (req, res) => {
    try {
        // req.user ahora es reconocido por TypeScript
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const stats = await (0, youtube_service_1.getRealTimeStats)(req.user.id, true);
        res.json(stats);
    }
    catch (error) {
        if (error instanceof error_middleware_1.UsageLimitExceededError) {
            return res.status(429).json({
                error: 'Monthly usage limit exceeded',
                feature: error.feature,
                limit: error.limit,
                current: error.current
            });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.refreshStats = refreshStats;
