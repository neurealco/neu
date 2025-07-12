import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { supabase } from '../services/supabase.service';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verificar token JWT
    const decoded = jwt.verify(token, config.JWT_SECRET) as { sub: string };
    
    // Verificar usuario en Supabase
    const { user, error } = await supabase.auth.api.getUserById(decoded.sub);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware para roles premium
export const premiumRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'premium') {
    return res.status(403).json({
      error: "Premium subscription required",
      upgradeUrl: "/dashboard/upgrade"
    });
  }
  next();
};