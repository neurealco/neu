"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = exports.getBalance = void 0;
const credits_service_1 = require("../services/credits.service");
const supabase_service_1 = require("../services/supabase.service");
const getBalance = async (req, res) => {
    try {
        // Verificar que el usuario está autenticado
        if (!req.user) {
            return res.status(401).json({ error: "Authentication required" });
        }
        const credits = await (0, credits_service_1.getUserCredits)(req.user.id);
        res.json({ credits });
    }
    catch (error) {
        // Convertir error a tipo Error para obtener el mensaje
        const err = error;
        res.status(500).json({ error: `Failed to get balance: ${err.message}` });
    }
};
exports.getBalance = getBalance;
const getHistory = async (req, res) => {
    try {
        // Verificar que el usuario está autenticado
        if (!req.user) {
            return res.status(401).json({ error: "Authentication required" });
        }
        const { data, error: dbError } = await supabase_service_1.supabase
            .from("credits_history")
            .select("*")
            .eq("user_id", req.user.id)
            .order("created_at", { ascending: false })
            .limit(50);
        if (dbError) {
            throw new Error(dbError.message);
        }
        res.json(data || []);
    }
    catch (error) {
        // Convertir error a tipo Error para obtener el mensaje
        const err = error;
        res.status(500).json({ error: `Failed to get history: ${err.message}` });
    }
};
exports.getHistory = getHistory;
