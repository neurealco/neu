"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const http_1 = require("http");
const cache_util_1 = require("./utils/cache.util");
const server = (0, http_1.createServer)(app_1.default);
const start = async () => {
    try {
        await (0, cache_util_1.initCache)();
        console.log('✅ Redis connected');
        const port = Number(config_1.default.PORT) || 8000;
        // Escuchar en 0.0.0.0 para conexiones externas
        server.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`🩺 Health check: http://0.0.0.0:${port}/health`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
start();
