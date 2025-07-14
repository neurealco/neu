// apps/backend/src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import creditsRoutes from './credits.routes';
import dashboardRoutes from './dashboard.routes';
import theoremRoutes from './theorem.routes';
import youtubeRoutes from './youtube.routes';
import aiRoutes from './ai.routes'; 

const router = Router();

router.use('/auth', authRoutes);
router.use('/credits', creditsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/theorem', theoremRoutes);
router.use('/youtube', youtubeRoutes);
router.use('/ai', aiRoutes); 

export default router;
