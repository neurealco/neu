"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientCreditsError = exports.errorHandler = void 0;
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const errorHandler = (err, req, res, next) => {
    // Log del error
    logger_util_1.default.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // Manejar errores específicos
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'InsufficientCreditsError') {
        return res.status(402).json({
            error: 'Insufficient credits',
            required: err.required,
            current: err.current
        });
    }
    if (err instanceof rate_limiter_flexible_1.RateLimiterRes) {
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: err.msBeforeNext / 1000
        });
    }
    // Error genérico
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
exports.errorHandler = errorHandler;
class InsufficientCreditsError extends Error {
    constructor(required, current) {
        super(`Insufficient credits. Required: ${required}, Current: ${current}`);
        this.required = required;
        this.current = current;
        this.name = 'InsufficientCreditsError';
    }
}
exports.InsufficientCreditsError = InsufficientCreditsError;
