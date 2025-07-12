import crypto from 'crypto';
import config from '../config';
import { addCredits } from './credits.service';

// Generar URL para iframe de encuestas
export const generateSurveyUrl = (userId: string) => {
  const baseUrl = 'https://survey.theoremreach.com';
  const params = new URLSearchParams({
    uid: userId,
    pid: '23884',
    appid: '23884',
    apikey: config.THEOREM_API_KEY
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// Verificar webhook de Theorem Reach
export const verifyWebhook = (payload: any, signature: string) => {
  const hmac = crypto.createHmac('sha256', config.THEOREM_SECRET);
  hmac.update(JSON.stringify(payload));
  const digest = hmac.digest('hex');
  return digest === signature;
};

// Procesar evento de encuesta completada
export const handleSurveyComplete = async (payload: any) => {
  const { user_id, amount } = payload;
  // Conversión 1:1 (1000 puntos = 1000 créditos)
  await addCredits(user_id, amount);
};