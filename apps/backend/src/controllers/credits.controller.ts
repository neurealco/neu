import { Request, Response } from "express";
import { getUserCredits } from "../services/credits.service";
import { supabase } from "../services/supabase.service";

export const getBalance = async (req: Request, res: Response) => {
  try {
    // Verificar que el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const credits = await getUserCredits(req.user.id);
    res.json({ credits });
  } catch (error) {
    // Convertir error a tipo Error para obtener el mensaje
    const err = error as Error;
    res.status(500).json({ error: `Failed to get balance: ${err.message}` });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    // Verificar que el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data, error: dbError } = await supabase
      .from("credits_history")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (dbError) {
      throw new Error(dbError.message);
    }

    res.json(data || []);
  } catch (error) {
    // Convertir error a tipo Error para obtener el mensaje
    const err = error as Error;
    res.status(500).json({ error: `Failed to get history: ${err.message}` });
  }
};
