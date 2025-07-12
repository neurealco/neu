import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({ errors: errors.array() });
  };
};

// Validador para webhook de Theorem Reach
export const webhookValidator = [
  body('user_id').isString().notEmpty(),
  body('amount').isInt({ min: 0 }),
  body('survey_id').isString().notEmpty(),
  body('status').isIn(['completed', 'terminated'])
];

// Validador para solicitudes de YouTube
export const youtubeStatsValidator = [
  body('channelId').optional().isString(),
  body('refresh').optional().isBoolean()
];