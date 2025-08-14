import express, { RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import logger from "./utils/logger.util";

const app = express();

// Middlewares básicos
app.use(cookieParser() as unknown as RequestHandler);

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

// Montar rutas principales
app.use("/", routes as RequestHandler);

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