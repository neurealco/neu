"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshStats = exports.getDashboardData = void 0;
const youtube_service_1 = require("../services/youtube.service");
const credits_service_1 = require("../services/credits.service");
const error_middleware_1 = require("../middleware/error.middleware");
const getDashboardData = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        // Obtener datos básicos del dashboard
        const stats = await (0, youtube_service_1.getBasicStats)(req.user.id);
        const credits = await (0, credits_service_1.getUserCredits)(req.user.id);
        res.json({
            youtube: stats,
            credits,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDashboardData = getDashboardData;
const refreshStats = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        await (0, credits_service_1.deductCredits)(req.user.id, 50, "YouTube stats refresh");
        // Obtener estadísticas actualizadas
        const stats = await (0, youtube_service_1.getRealTimeStats)(req.user.id, true);
        res.json(stats);
    }
    catch (error) {
        if (error instanceof error_middleware_1.InsufficientCreditsError) {
            return res.status(402).json({
                error: "Insufficient credits",
                required: error.required,
                current: error.current,
            });
        }
        res.status(500).json({ error: error.message });
    }
};
exports.refreshStats = refreshStats;
