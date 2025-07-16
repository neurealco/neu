import { Request, Response } from "express";
import { getRealTimeStats, getBasicStats } from "../services/youtube.service";
import { getUserCredits, deductCredits } from "../services/credits.service";
import { InsufficientCreditsError } from "../middleware/error.middleware";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Obtener datos básicos del dashboard
    const stats = await getBasicStats(req.user.id);
    const credits = await getUserCredits(req.user.id);

    res.json({
      youtube: stats,
      credits,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    await deductCredits(req.user.id, 50, "YouTube stats refresh");

    // Obtener estadísticas actualizadas
    const stats = await getRealTimeStats(req.user.id, true);

    res.json(stats);
  } catch (error: any) {
    if (error instanceof InsufficientCreditsError) {
      return res.status(402).json({
        error: "Insufficient credits",
        required: error.required,
        current: error.current,
      });
    }
    res.status(500).json({ error: error.message });
  }
};
