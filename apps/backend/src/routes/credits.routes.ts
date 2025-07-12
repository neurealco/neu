import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getBalance, getHistory } from '../controllers/credits.controller';

const router = Router();

router.use(authenticate);

router.get('/balance', getBalance);
router.get('/history', getHistory);

export default router;