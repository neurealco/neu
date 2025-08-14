import express from "express";
import cors from "cors";
import cookieParserLib from "cookie-parser";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import logger from "./utils/logger.util";

const app = express();

// Solución para cookie-parser
const cookieParser = cookieParserLib as any as (options?: any) => express.RequestHandler;
app.use(cookieParser());

app.use(
  cors({
    origin: config.SITE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// Middleware de diagnóstico de solicitudes
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    headers: req.headers,
    cookies: req.cookies
  });
  next();
});

// Health check
app.get("/health", (req, res) => {
  logger.info("🩺 Health check passed");
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Montar rutas principales
app.use("/api", routes);

// Middleware de error
app.use(errorHandler);

// ===== DIAGNÓSTICO DE RUTAS CORREGIDO =====
function printRoutes(layer: any, prefix: string = "", depth: number = 0): void {
  const indent = "  ".repeat(depth);
  
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    logger.debug(`${indent}[ROUTE] ${methods} ${prefix}${layer.route.path}`);
  } else if (layer.name === "router" && layer.handle.stack) {
    // Expresión regular simplificada y corregida
    const regexStr = layer.regexp.toString()
      .replace(/^\/\^/, "")
      .replace(/\\\//g, "/")
      .replace(/\(\?=\\\/\|\$\)\//, "")
      .replace(/\/i$/, "");

    const newPrefix = prefix + regexStr;
    
    logger.debug(`${indent}[ROUTER] ${newPrefix}`);
    
    layer.handle.stack.forEach((sublayer: any) => {
      printRoutes(sublayer, newPrefix, depth + 1);
    });
  } else if (layer.name) {
    logger.debug(`${indent}[MIDDLEWARE] ${layer.name}`);
  }
}

// Diagnóstico después de inicializar
app.on("mount", () => {
  logger.info("===== INICIO DE DIAGNÓSTICO DE RUTAS =====");
  app._router.stack.forEach((layer: any) => printRoutes(layer));
  logger.info("===== FIN DE DIAGNÓSTICO DE RUTAS =====");
});

export default app;