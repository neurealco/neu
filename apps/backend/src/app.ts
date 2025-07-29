import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { apiRateLimiter, rateLimitMiddleware } from "./utils/rateLimit.util";

const app = express();

app.use(
  cors({
    origin: config.SITE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return cookieParser()(req as any, res as any, next as any);
  }
);

// Agrega esto después de app.use(cookieParser());
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString()
  });
});

app.use(rateLimitMiddleware(apiRateLimiter));

// Routes
app.get("/api/test", (req, res) => {
  res.json({ status: "Backend working", time: new Date() });
});

app.use("/api", routes);

// Error handling
app.use(errorHandler);

export default app;
