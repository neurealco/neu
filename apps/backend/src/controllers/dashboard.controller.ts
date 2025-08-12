import { Request, Response } from "express";
import { getRealTimeStats, getBasicStats } from "../services/youtube.service";
import { supabase } from "../services/supabase.service";
import { checkUsage } from "../services/usage.service";
import { UsageLimitExceededError } from "../middleware/error.middleware";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Verificar que el usuario está autenticado (req.user ahora es reconocido)
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;
    const stats = await getBasicStats(userId);

    // Obtener información del usuario
    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('subscription_plan, trial_ends_at')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw new Error('User profile not found');
    }

    // Obtener los usos actuales
    const [youtubeUsage, aiUsage] = await Promise.all([
      checkUsage(userId, 'youtube_refresh'),
      checkUsage(userId, 'ai_chat')
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshStats = async (req: Request, res: Response) => {
  try {
    // req.user ahora es reconocido por TypeScript
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const stats = await getRealTimeStats(req.user.id, true);
    res.json(stats);
  } catch (error: any) {
    if (error instanceof UsageLimitExceededError) {
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