// apps/backend/src/controllers/theorem.controller.ts
import { Request, Response } from 'express';
import { addCredits } from '../services/credits.service';
import logger from '../utils/logger.util';

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payload = req.body as TheoremReachWebhook;
    
    if (payload.status === 'completed') {
      await addCredits(
        payload.user_id, 
        payload.amount,
        `Survey completed: ${payload.survey_id}`
      );
      
      logger.info(`Credits added to user: ${payload.user_id}, amount: ${payload.amount}`);
    }
    
    res.send('OK');
  } catch (error) {
    logger.error(`Theorem webhook failed: ${error.message}`);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
