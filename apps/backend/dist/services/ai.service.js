"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithAI = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const credits_service_1 = require("./credits.service");
const cache_util_1 = require("../utils/cache.util");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const CHAT_COST = 100;
const AI_MODEL = "distilgpt2";
// Plantilla para mejorar respuestas en español
const SPANISH_PROMPT_TEMPLATE = (history, newMessage) => {
    let prompt = "Eres un experto asistente de YouTube especializado en crecimiento de canales, SEO y estrategias de contenido. Responde de forma concisa y profesional en español.\n\n";
    // Agregar historial de conversación
    history.forEach((msg, i) => {
        prompt += `${i % 2 === 0 ? "Usuario" : "Asistente"}: ${msg}\n`;
    });
    // Agregar nuevo mensaje
    prompt += `Usuario: ${newMessage}\nAsistente:`;
    return prompt;
};
const chatWithAI = async (userId, message) => {
    try {
        // 1. Obtener historial de chat desde Redis
        const cacheKey = `user:${userId}:chat_history`;
        const cachedHistory = await cache_util_1.redisClient.get(cacheKey);
        let history = cachedHistory ? JSON.parse(cachedHistory) : [];
        // 2. Construir prompt con historial
        const prompt = SPANISH_PROMPT_TEMPLATE(history, message);
        // 3. Llamar a la API de Hugging Face
        const response = await axios_1.default.post(`https://api-inference.huggingface.co/models/${AI_MODEL}`, {
            inputs: prompt,
            parameters: {
                max_new_tokens: 200,
                temperature: 0.7,
                repetition_penalty: 1.2,
                top_k: 50,
                top_p: 0.95,
            },
        }, {
            headers: { Authorization: `Bearer ${config_1.default.HUGGINGFACE_API_KEY}` },
            timeout: 15000, // 15 segundos timeout
        });
        // 4. Procesar y limpiar respuesta
        let aiResponse = response.data[0]?.generated_text || "";
        aiResponse = aiResponse.replace(prompt, "").trim();
        // Eliminar texto sobrante después de la respuesta
        const stopSequences = ["\nUsuario:", "\nAsistente:", "\n\n"];
        for (const seq of stopSequences) {
            const index = aiResponse.indexOf(seq);
            if (index !== -1)
                aiResponse = aiResponse.substring(0, index);
        }
        // 5. Actualizar historial en Redis
        history.push(message, aiResponse);
        // Mantener solo las últimas 4 interacciones (8 mensajes)
        if (history.length > 8)
            history = history.slice(-8);
        await cache_util_1.redisClient.setex(cacheKey, 60 * 60 * 4, JSON.stringify(history)); // 4 horas
        // 6. Deducir créditos
        await (0, credits_service_1.deductCredits)(userId, CHAT_COST, "Consulta de Asistente IA");
        return (aiResponse ||
            "No pude generar una respuesta. ¿Podrías reformular tu pregunta?");
    }
    catch (error) {
        // Convertir error a tipo AxiosError para manejar específicamente
        const axiosError = error;
        // Registrar el error completo
        logger_util_1.default.error(`AI service error: ${axiosError.message}`, {
            code: axiosError.code,
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            stack: axiosError.stack,
        });
        // Manejar errores específicos de Hugging Face
        if (axiosError.response?.data) {
            const responseData = axiosError.response.data;
            if (responseData.error?.includes("model is currently loading")) {
                return "El asistente está iniciando. Por favor intenta nuevamente en 20 segundos.";
            }
        }
        throw new Error("Error en el servicio de IA. Por favor intenta más tarde.");
    }
};
exports.chatWithAI = chatWithAI;
