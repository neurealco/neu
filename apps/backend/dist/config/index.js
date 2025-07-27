"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_SECRET: process.env.SUPABASE_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY || "",
    THEOREM_API_KEY: process.env.THEOREM_API_KEY || "",
    THEOREM_SECRET: process.env.THEOREM_SECRET || "",
    JWT_SECRET: process.env.JWT_SECRET || "neureal_secret_2023",
    PORT: process.env.PORT || 8000,
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    CACHE_TTL: 60 * 15,
    SITE_URL: process.env.SITE_URL || "",
    NODE_ENV: process.env.NODE_ENV || "",
};
