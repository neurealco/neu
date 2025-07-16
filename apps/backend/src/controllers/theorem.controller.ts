import { Request, Response } from "express";
import { handleWebhook } from "../services/theorem.service";
import logger from "../utils/logger.util";

export const theoremWebhook = async (req: Request, res: Response) => {
  try {
    await handleWebhook(req, res);
  } catch (error) {
    // Convertir error a tipo Error para obtener el mensaje
    const err = error as Error;
    logger.error(`Theorem webhook failed: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
