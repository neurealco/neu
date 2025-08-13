"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const rateLimit_util_1 = require("./utils/rateLimit.util");
const app = (0, express_1.default)();
// Solución 1: Usar una sintaxis alternativa para cookie-parser
const cookieParser = cookie_parser_1.default;
app.use(cookieParser());
// Solución 2: Usar require en lugar de import
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.use((0, cors_1.default)({
    origin: config_1.default.SITE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
app.use((0, rateLimit_util_1.rateLimitMiddleware)(rateLimit_util_1.apiRateLimiter));
// Ruta de prueba
app.get("/api/test", (req, res) => {
    res.json({ status: "Backend working", time: new Date() });
});
// Montar rutas principales
app.use("/api", routes_1.default);
// Error handling
app.use(error_middleware_1.errorHandler);
function printRoutes(layer, prefix = "") {
    if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
        console.log(`[ROUTE] ${methods} ${prefix}${layer.route.path}`);
    }
    else if (layer.name === "router" && layer.handle.stack) {
        const newPrefix = prefix + (layer.regexp.source
            .replace("\\/", "/")
            .replace("(?=\\/|$)", "")
            .replace("/^", "")
            .replace("\\/?(?=/|$)", ""));
        layer.handle.stack.forEach((sublayer) => {
            printRoutes(sublayer, newPrefix);
        });
    }
}
console.log("===== RUTAS REGISTRADAS =====");
app._router.stack.forEach((layer) => printRoutes(layer));
console.log("==============================");
exports.default = app;
