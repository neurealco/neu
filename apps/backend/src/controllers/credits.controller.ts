import { Request, Response } from 'express';
import { getUserCredits } from '../services/credits.service';
import { supabase } from '../services/supabase.service';

export const getBalance = async (req: Request, res: Response) => {
  try {
    const credits = await getUserCredits(req.user.id);
    res.json({ credits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get balance' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('credits_history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get history' });
  }
};