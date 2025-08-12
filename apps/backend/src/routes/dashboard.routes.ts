import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getDashboardData,
  refreshStats,
} from "../controllers/dashboard.controller";

const router = Router();

router.use(authenticate);

router.get("/", getDashboardData);
router.post("/refresh", refreshStats);

// Exportar como objeto nombrado
export const dashboardRoutes = router;