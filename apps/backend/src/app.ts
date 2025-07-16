import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { apiRateLimiter } from "./utils/rateLimit.util";

const app = express();

app.use(
  cors({
    origin: config.SITE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

// Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

export default app;
