"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageLimitExceededError = exports.errorHandler = void 0;
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const errorHandler = (err, req, res, next) => {
    // Log error details
    logger_util_1.default.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // Handle specific error types
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'UsageLimitExceededError') {
        return res.status(429).json({
            error: 'Monthly usage limit exceeded',
            feature: err.feature,
            limit: err.limit,
            current: err.current
        });
    }
    if (err instanceof rate_limiter_flexible_1.RateLimiterRes) {
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: err.msBeforeNext / 1000
        });
    }
    // Generic error handling
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
exports.errorHandler = errorHandler;
class UsageLimitExceededError extends Error {
    constructor(feature, limit, current) {
        super(`Usage limit exceeded for feature: ${feature}`);
        this.feature = feature;
        this.limit = limit;
        this.current = current;
        this.name = 'UsageLimitExceededError';
    }
}
exports.UsageLimitExceededError = UsageLimitExceededError;
