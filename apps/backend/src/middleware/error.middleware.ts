import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.util';
import { RateLimiterRes } from 'rate-limiter-flexible';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log del error
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
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
  
  if (err instanceof RateLimiterRes) {
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

export class InsufficientCreditsError extends Error {
  constructor(public required: number, public current: number) {
    super(`Insufficient credits. Required: ${required}, Current: ${current}`);
    this.name = 'InsufficientCreditsError';
  }
}