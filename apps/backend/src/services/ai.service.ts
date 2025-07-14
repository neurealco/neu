// apps/backend/src/services/ai.service.ts
import axios from 'axios';
import config from '../config';
import { deductCredits } from './credits.service';
import { redisClient } from '../utils/cache.util';
import logger from '../utils/logger.util';

const CHAT_COST = 100; // 100 créditos por mensaje
const AI_MODEL = 'distilgpt2'; // Modelo MIT de Hugging Face

// Plantilla para mejorar respuestas en español
const SPANISH_PROMPT_TEMPLATE = (history: string[], newMessage: string) => {
  let prompt = "Eres un experto asistente de YouTube especializado en crecimiento de canales, SEO y estrategias de contenido. Responde de forma concisa y profesional en español.\n\n";
  
  // Agregar historial de conversación
  history.forEach((msg, i) => {
    prompt += `${i % 2 === 0 ? 'Usuario' : 'Asistente'}: ${msg}\n`;
  });
  
  // Agregar nuevo mensaje
  prompt += `Usuario: ${newMessage}\nAsistente:`;
  
  return prompt;
};

export const chatWithAI = async (userId: string, message: string): Promise<string> => {
  try {
    // 1. Obtener historial de chat desde Redis
    const cacheKey = `user:${userId}:chat_history`;
    const cachedHistory = await redisClient.get(cacheKey);
    let history: string[] = cachedHistory ? JSON.parse(cachedHistory) : [];
    
    // 2. Construir prompt con historial
    const prompt = SPANISH_PROMPT_TEMPLATE(history, message);
    
    // 3. Llamar a la API de Hugging Face
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/' + AI_MODEL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          repetition_penalty: 1.2,
          top_k: 50,
          top_p: 0.95
        }
      },
      {
        headers: { Authorization: `Bearer ${config.HUGGINGFACE_API_KEY}` },
        timeout: 15000 // 15 segundos timeout
      }
    );
    
    // 4. Procesar y limpiar respuesta
    let aiResponse = response.data[0]?.generated_text || '';
    aiResponse = aiResponse.replace(prompt, '').trim();
    
    // Eliminar texto sobrante después de la respuesta
    const stopSequences = ['\nUsuario:', '\nAsistente:', '\n\n'];
    for (const seq of stopSequences) {
      const index = aiResponse.indexOf(seq);
      if (index !== -1) aiResponse = aiResponse.substring(0, index);
    }
    
    // 5. Actualizar historial en Redis
    history.push(message, aiResponse);
    // Mantener solo las últimas 4 interacciones (8 mensajes)
    if (history.length > 8) history = history.slice(-8);
    await redisClient.setex(cacheKey, 60 * 60 * 4, JSON.stringify(history)); // 4 horas
    
    // 6. Deducir créditos
    await deductCredits(userId, CHAT_COST, 'Consulta de Asistente IA');
    
    return aiResponse || 'No pude generar una respuesta. ¿Podrías reformular tu pregunta?';
  } catch (error) {
    logger.error(`AI service error: ${error.message}`);
    
    // Manejar errores específicos de Hugging Face
    if (error.response?.data?.error) {
      const hfError = error.response.data.error;
      if (hfError.includes('model is currently loading')) {
        return 'El asistente está iniciando. Por favor intenta nuevamente en 20 segundos.';
      }
    }
    
    throw new Error('Error en el servicio de IA. Por favor intenta más tarde.');
  }
};
