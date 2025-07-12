import { Router } from 'express';
import { handleWebhook } from '../controllers/theorem.controller';
import { webhookValidator } from '../middleware/validate.middleware';

const router = Router();

router.post('/webhook', webhookValidator, handleWebhook);

export default router;