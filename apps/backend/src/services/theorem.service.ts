import crypto from "crypto";
import config from "../config";
import { addCredits } from "./credits.service";
import { TheoremReachWebhook } from "../types/custom";
import logger from "../utils/logger.util";
import { Request, Response } from "express";

// Generar URL para iframe de encuestas
export const generateSurveyUrl = (userId: string) => {
  const baseUrl = "https://survey.theoremreach.com";
  const params = new URLSearchParams({
    uid: userId,
    pid: "23884",
    appid: "23884",
    apikey: config.THEOREM_API_KEY,
  });

  return `${baseUrl}?${params.toString()}`;
};

// Verificar webhook de Theorem Reach
export const verifyWebhook = (payload: any, signature: string) => {
  const hmac = crypto.createHmac("sha256", config.THEOREM_SECRET);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest("hex");
  return digest === signature;
};

// Procesar evento de encuesta completada
export const handleSurveyComplete = async (payload: TheoremReachWebhook) => {
  const { user_id, amount, survey_id } = payload;

  // Conversión 1:1 (1000 puntos = 1000 créditos)
  await addCredits(user_id, amount, `Survey completed: ${survey_id}`);

  logger.info(`Credits added to user: ${user_id}, amount: ${amount}`);
};

// Controlador para webhook de Theorem
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    // Obtener firma del header
    const signature = req.header("x-theoremreach-signature");

    // Verificar que existe la firma
    if (!signature) {
      return res.status(401).json({ error: "Missing signature header" });
    }

    const payload = req.body as TheoremReachWebhook;

    // Verificar la firma
    if (!verifyWebhook(payload, signature)) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Procesar solo encuestas completadas
    if (payload.status === "completed") {
      await handleSurveyComplete(payload);
    }

    // Responder con OK
    res.status(200).send("OK");
  } catch (error) {
    // Convertir error a tipo Error para obtener el mensaje
    const err = error as Error;
    logger.error(`Theorem webhook failed: ${err.message}`, {
      stack: err.stack,
    });
    res.status(500).json({ error: "Webhook processing failed" });
  }
};
