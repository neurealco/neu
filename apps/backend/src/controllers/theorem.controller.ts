import { Request, Response } from 'express';
import { handleSurveyComplete } from '../services/theorem.service';
import logger from '../utils/logger.util';

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payload = req.body as TheoremReachWebhook;
    
    // Solo procesar encuestas completadas
    if (payload.status === 'completed') {
      await handleSurveyComplete(payload.user_id, payload.amount);
      logger.info(`Credits added to user: ${payload.user_id}, amount: ${payload.amount}`);
    }
    
    res.send('OK');
  } catch (error) {
    logger.error(`Theorem webhook failed: ${error.message}`);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};