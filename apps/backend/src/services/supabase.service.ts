import { createClient } from '@supabase/supabase-js';
import config from '../config';

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SECRET,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  }
);

// Función para ejecutar RPCs de créditos
export const rpc = async (fn: string, params: any) => {
  const { data, error } = await supabase.rpc(fn, params);
  if (error) throw error;
  return data;
};