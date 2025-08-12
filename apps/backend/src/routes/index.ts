import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { subscriptionRoutes } from "./subscription.routes";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Ruta de health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

// Rutas públicas
router.use("/api/auth", authRoutes);

// Rutas protegidas
router.use("/api/dashboard", authenticate, dashboardRoutes);
router.use("/api/subscription", subscriptionRoutes);

// Ruta de prueba
router.get("/api/test", (req, res) => {
  res.json({ status: "Backend working", time: new Date() });
});

export default router;