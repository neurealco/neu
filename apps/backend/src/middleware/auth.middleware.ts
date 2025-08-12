import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { supabase } from '../services/supabase.service';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { sub: string };
    const { data, error } = await supabase.auth.admin.getUserById(decoded.sub);
    
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Asignar usuario a req.user (TypeScript ahora lo reconoce)
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};