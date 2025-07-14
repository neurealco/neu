// apps/backend/src/controllers/dashboard.controller.ts
import { Request, Response } from 'express';
import { getRealTimeStats } from '../services/youtube.service';
import { getUserCredits, deductCredits } from '../services/credits.service';
import { InsufficientCreditsError } from '../middleware/error.middleware';

export const refreshStats = async (req: Request, res: Response) => {
  try {
    await deductCredits(
      req.user.id, 
      50,
      'YouTube stats refresh'
    );
    
    // 2. Luego obtener las nuevas estadísticas
    const stats = await getRealTimeStats(req.user.id);
    
    res.json(stats);
  } catch (error: any) {
    if (error instanceof InsufficientCreditsError) {
      return res.status(402).json({ 
        error: 'Insufficient credits',
        required: error.required,
        current: error.current
      });
    }
    res.status(500).json({ error: error.message });
  }
};
