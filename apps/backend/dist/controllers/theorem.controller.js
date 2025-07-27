"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theoremWebhook = void 0;
const theorem_service_1 = require("../services/theorem.service");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const theoremWebhook = async (req, res) => {
    try {
        await (0, theorem_service_1.handleWebhook)(req, res);
    }
    catch (error) {
        // Convertir error a tipo Error para obtener el mensaje
        const err = error;
        logger_util_1.default.error(`Theorem webhook failed: ${err.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.theoremWebhook = theoremWebhook;
