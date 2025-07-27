"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = __importDefault(require("../config"));
exports.supabase = (0, supabase_js_1.createClient)(config_1.default.SUPABASE_URL, config_1.default.SUPABASE_SECRET, {
    auth: {
        autoRefreshToken: true,
        persistSession: false
    }
});
// Función para ejecutar RPCs de créditos
const rpc = async (fn, params) => {
    const { data, error } = await exports.supabase.rpc(fn, params);
    if (error)
        throw error;
    return data;
};
exports.rpc = rpc;
