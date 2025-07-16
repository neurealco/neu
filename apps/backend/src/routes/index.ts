import { Router } from "express";
import { authRoutes } from "./auth.routes";
import creditsRoutes from "./credits.routes";
import dashboardRoutes from "./dashboard.routes";
import theoremRoutes from "./theorem.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/credits", creditsRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/theorem", theoremRoutes);

export default router;
