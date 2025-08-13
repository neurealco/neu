import express from "express";
import cors from "cors";
import cookieParserLib from "cookie-parser";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { apiRateLimiter, rateLimitMiddleware } from "./utils/rateLimit.util";

const app = express();

// Solución 1: Usar una sintaxis alternativa para cookie-parser
const cookieParser = cookieParserLib as any as (options?: any) => express.RequestHandler;
app.use(cookieParser());

// Solución 2: Usar require en lugar de import
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.use(
  cors({
    origin: config.SITE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

app.use(rateLimitMiddleware(apiRateLimiter));

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ status: "Backend working", time: new Date() });
});

// Montar rutas principales
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// ===== DIAGNÓSTICO DE RUTAS =====
type ExpressLayer = {
  route?: {
    path: string;
    methods: { [method: string]: boolean };
  };
  name: string;
  handle: {
    stack?: ExpressLayer[];
  };
  regexp: RegExp;
};

function printRoutes(layer: ExpressLayer, prefix: string = "") {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    console.log(`[ROUTE] ${methods} ${prefix}${layer.route.path}`);
  } else if (layer.name === "router" && layer.handle.stack) {
    const newPrefix = prefix + (layer.regexp.source
      .replace("\\/", "/")
      .replace("(?=\\/|$)", "")
      .replace("/^", "")
      .replace("\\/?(?=/|$)", ""));
    
    layer.handle.stack.forEach((sublayer: ExpressLayer) => {
      printRoutes(sublayer, newPrefix);
    });
  }
}

console.log("===== RUTAS REGISTRADAS =====");
app._router.stack.forEach((layer: any) => printRoutes(layer));
console.log("==============================");

export default app;