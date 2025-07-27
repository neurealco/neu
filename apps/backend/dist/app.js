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
app.use((0, cors_1.default)({
    origin: config_1.default.SITE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    return (0, cookie_parser_1.default)()(req, res, next);
});
app.use((0, rateLimit_util_1.rateLimitMiddleware)(rateLimit_util_1.apiRateLimiter));
// Routes
app.use("/api", routes_1.default);
// Error handling
app.use(error_middleware_1.errorHandler);
exports.default = app;
