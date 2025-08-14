import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import authRoutes from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes"; // Importación corregida
import { subscriptionRoutes } from "./subscription.routes"; // Importación corregida
import logger from "../utils/logger.util";

const router = Router();

// Middleware de diagnóstico para todas las rutas
router.use((req, res, next) => {
  logger.info(`📭 Route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

// Montar authRoutes
router.use("/auth", authRoutes);
logger.info("✅ Auth routes mounted successfully");

// Montar dashboardRoutes (protegidas)
router.use("/dashboard", authenticate, dashboardRoutes);
logger.info("✅ Dashboard routes mounted successfully");

// Montar subscriptionRoutes
router.use("/subscription", subscriptionRoutes);
logger.info("✅ Subscription routes mounted successfully");

// Ruta de prueba
router.get("/test", (req, res) => {
  res.json({ status: "Backend working", time: new Date() });
});

// Ruta de diagnóstico de rutas registradas
router.get("/route-debug", (req, res) => {
  const routes: Array<{ method: string; path: string }> = [];

  // Función recursiva para recolectar rutas
  const getRoutes = (layer: any, prefix = ""): void => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase());
      routes.push({
        method: methods.join(','),
        path: `${prefix}${layer.route.path}`
      });
    } else if (layer.name === "router" && layer.handle.stack) {
      const newPrefix = prefix + (layer.regexp.source
        .replace("\\/?(?=\\/|$)", "")
        .replace("^", "")
        .replace("\\", ""));
      
      layer.handle.stack.forEach((sublayer: any) => {
        getRoutes(sublayer, newPrefix);
      });
    }
  };

  router.stack.forEach(layer => getRoutes(layer));

  res.json({ routes });
});

export default router;