import express, { RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Importación corregida
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import logger from "./utils/logger.util";
import { URL } from "url";

const app = express();

app.use("/", routes as RequestHandler); // Conversión explícita

// Middlewares básicos - Solución para cookie-parser
app.use(cookieParser() as unknown as import("express").RequestHandler);

app.use(cors({
  origin: config.SITE_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
} as cors.CorsOptions));

app.use(express.json());

// Middleware de diagnóstico de solicitudes
app.use((req, res, next) => {
  logger.info(`🌐 Solicitud recibida: ${req.method} ${req.originalUrl}`);
  next();
});

// Health check mejorado
app.get("/health", (req, res) => {
  logger.info("🩺 Health check passed");
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Ruta de diagnóstico del sistema
app.get("/api/system/debug", (req, res) => {
  const routes = app._router.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => ({
      path: layer.route.path,
      methods: Object.keys(layer.route.methods)
    }));

  res.json({
    node: process.version,
    environment: config.NODE_ENV,
    routes: routes,
    time: new Date().toISOString()
  });
});

// Middleware de errores
app.use(errorHandler as express.ErrorRequestHandler);

// Diagnóstico de rutas al iniciar
app.on("mount", () => {
  logger.info("🚀 Aplicación iniciada");
  
  const routes = app._router.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => ({
      path: layer.route.path,
      methods: Object.keys(layer.route.methods)
    }));
  
  logger.info("📋 Rutas registradas:", { routes });
});

export default app;