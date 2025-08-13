"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _default = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_SECRET: process.env.SUPABASE_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY || "",
    JWT_SECRET: process.env.JWT_SECRET || "neureal_secret_2023",
    PORT: process.env.PORT || 8000,
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    CACHE_TTL: 60 * 15,
    SITE_URL: process.env.SITE_URL || "",
    NODE_ENV: process.env.NODE_ENV || "",
    // Configuración de Paddle
    PADDLE_VENDOR_ID: process.env.PADDLE_VENDOR_ID || "",
    PADDLE_API_KEY: process.env.PADDLE_API_KEY || "",
    PADDLE_PUBLIC_KEY: process.env.PADDLE_PUBLIC_KEY || "",
    PADDLE_CHECKOUT_URL: process.env.PADDLE_CHECKOUT_URL || "https://checkout.paddle.com",
    // IDs de planes de Paddle (nuevas variables)
    PADDLE_PLUS_PLAN_ID: process.env.PADDLE_PLUS_PLAN_ID || "",
    PADDLE_PRO_PLAN_ID: process.env.PADDLE_PRO_PLAN_ID || ""
};
