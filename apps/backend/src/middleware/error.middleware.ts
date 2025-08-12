import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.util';
import { RateLimiterRes } from 'rate-limiter-flexible';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error details
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
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
  
  if (err instanceof RateLimiterRes) {
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

export class UsageLimitExceededError extends Error {
  constructor(
    public feature: string,
    public limit: number,
    public current: number
  ) {
    super(`Usage limit exceeded for feature: ${feature}`);
    this.name = 'UsageLimitExceededError';
  }
}