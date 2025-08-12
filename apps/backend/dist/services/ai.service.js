"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithAI = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const cache_util_1 = require("../utils/cache.util");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const usage_service_1 = require("./usage.service");
const error_middleware_1 = require("../middleware/error.middleware");
const AI_MODEL = "distilgpt2";
// English prompt template
const ENGLISH_PROMPT_TEMPLATE = (history, newMessage) => {
    let prompt = "You are a YouTube expert assistant specialized in channel growth, SEO, and content strategies. Respond concisely and professionally in the user's language.\n\n";
    // Add conversation history
    history.forEach((msg, i) => {
        prompt += `${i % 2 === 0 ? "User" : "Assistant"}: ${msg}\n`;
    });
    // Add new message
    prompt += `User: ${newMessage}\nAssistant:`;
    return prompt;
};
const chatWithAI = async (userId, message) => {
    try {
        // Check usage limit
        const { currentUsage, limit } = await (0, usage_service_1.checkUsage)(userId, 'ai_chat');
        if (currentUsage >= limit) {
            throw new error_middleware_1.UsageLimitExceededError('ai_chat', limit, currentUsage);
        }
        // 1. Get chat history from Redis
        const cacheKey = `user:${userId}:chat_history`;
        const cachedHistory = await cache_util_1.redisClient.get(cacheKey);
        let history = cachedHistory ? JSON.parse(cachedHistory) : [];
        // 2. Build prompt with history
        const prompt = ENGLISH_PROMPT_TEMPLATE(history, message);
        // 3. Call Hugging Face API
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
            timeout: 15000, // 15 seconds timeout
        });
        // 4. Process and clean response
        let aiResponse = response.data[0]?.generated_text || "";
        aiResponse = aiResponse.replace(prompt, "").trim();
        // Remove extra text after the response
        const stopSequences = ["\nUser:", "\nAssistant:", "\n\n"];
        for (const seq of stopSequences) {
            const index = aiResponse.indexOf(seq);
            if (index !== -1)
                aiResponse = aiResponse.substring(0, index);
        }
        // 5. Update history in Redis
        history.push(message, aiResponse);
        // Keep only the last 4 interactions (8 messages)
        if (history.length > 8)
            history = history.slice(-8);
        await cache_util_1.redisClient.setex(cacheKey, 60 * 60 * 4, JSON.stringify(history)); // 4 hours
        // 6. Increment usage counter
        await (0, usage_service_1.incrementUsage)(userId, 'ai_chat');
        return (aiResponse ||
            "I couldn't generate a response. Could you rephrase your question?");
    }
    catch (error) {
        // Convert error to AxiosError for specific handling
        const axiosError = error;
        // Log full error
        logger_util_1.default.error(`AI service error: ${axiosError.message}`, {
            code: axiosError.code,
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            stack: axiosError.stack,
        });
        // Handle specific Hugging Face errors
        if (axiosError.response?.data) {
            const responseData = axiosError.response.data;
            if (responseData.error?.includes("model is currently loading")) {
                return "The assistant is starting. Please try again in 20 seconds.";
            }
        }
        // If the error is due to usage limit, propagate it
        if (error instanceof error_middleware_1.UsageLimitExceededError) {
            throw error;
        }
        throw new Error("Error in the AI service. Please try again later.");
    }
};
exports.chatWithAI = chatWithAI;
