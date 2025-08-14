import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
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

// Importar y montar authRoutes con diagnóstico
try {
  const authRoutes = require("./auth.routes").default;
  router.use("/api/auth", authRoutes);
  logger.info("✅ Auth routes mounted successfully");
} catch (error) {
  logger.error("🔥 Failed to mount auth routes", error);
}

// Importar y montar dashboardRoutes
try {
  const { dashboardRoutes } = require("./dashboard.routes");
  router.use("/api/dashboard", authenticate, dashboardRoutes);
  logger.info("✅ Dashboard routes mounted successfully");
} catch (error) {
  logger.error("🔥 Failed to mount dashboard routes", error);
}

// Importar y montar subscriptionRoutes
try {
  const { subscriptionRoutes } = require("./subscription.routes");
  router.use("/api/subscription", subscriptionRoutes);
  logger.info("✅ Subscription routes mounted successfully");
} catch (error) {
  logger.error("🔥 Failed to mount subscription routes", error);
}

// Ruta de prueba
router.get("/api/test", (req, res) => {
  res.json({ status: "Backend working", time: new Date() });
});

// Ruta de diagnóstico de rutas registradas
router.get("/api/route-debug", (req, res) => {
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