import { Request, Response } from 'express';
import { getRealTimeStats } from '../services/youtube.service';
import { getUserCredits } from '../services/credits.service';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const [stats, credits] = await Promise.all([
      getRealTimeStats(req.user.id),
      getUserCredits(req.user.id)
    ]);
    
    res.json({
      credits,
      youtube: stats
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshStats = async (req: Request, res: Response) => {
  try {
    const stats = await getRealTimeStats(req.user.id);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};