"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = exports.handleSurveyComplete = exports.verifyWebhook = exports.generateSurveyUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../config"));
const credits_service_1 = require("./credits.service");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
// Generar URL para iframe de encuestas
const generateSurveyUrl = (userId) => {
    const baseUrl = "https://survey.theoremreach.com";
    const params = new URLSearchParams({
        uid: userId,
        pid: "23884",
        appid: "23884",
        apikey: config_1.default.THEOREM_API_KEY,
    });
    return `${baseUrl}?${params.toString()}`;
};
exports.generateSurveyUrl = generateSurveyUrl;
// Verificar webhook de Theorem Reach
const verifyWebhook = (payload, signature) => {
    const hmac = crypto_1.default.createHmac("sha256", config_1.default.THEOREM_SECRET);
    hmac.update(JSON.stringify(payload));
    const digest = hmac.digest("hex");
    return digest === signature;
};
exports.verifyWebhook = verifyWebhook;
// Procesar evento de encuesta completada
const handleSurveyComplete = async (payload) => {
    const { user_id, amount, survey_id } = payload;
    // Conversión 1:1 (1000 puntos = 1000 créditos)
    await (0, credits_service_1.addCredits)(user_id, amount, `Survey completed: ${survey_id}`);
    logger_util_1.default.info(`Credits added to user: ${user_id}, amount: ${amount}`);
};
exports.handleSurveyComplete = handleSurveyComplete;
// Controlador para webhook de Theorem
const handleWebhook = async (req, res) => {
    try {
        // Obtener firma del header
        const signature = req.header("x-theoremreach-signature");
        // Verificar que existe la firma
        if (!signature) {
            return res.status(401).json({ error: "Missing signature header" });
        }
        const payload = req.body;
        // Verificar la firma
        if (!(0, exports.verifyWebhook)(payload, signature)) {
            return res.status(401).json({ error: "Invalid signature" });
        }
        // Procesar solo encuestas completadas
        if (payload.status === "completed") {
            await (0, exports.handleSurveyComplete)(payload);
        }
        // Responder con OK
        res.status(200).send("OK");
    }
    catch (error) {
        // Convertir error a tipo Error para obtener el mensaje
        const err = error;
        logger_util_1.default.error(`Theorem webhook failed: ${err.message}`, {
            stack: err.stack,
        });
        res.status(500).json({ error: "Webhook processing failed" });
    }
};
exports.handleWebhook = handleWebhook;
