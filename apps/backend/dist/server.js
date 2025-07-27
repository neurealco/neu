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
    await (0, cache_util_1.initCache)();
    server.listen(config_1.default.PORT, () => {
        console.log(`🚀 Server running on port ${config_1.default.PORT}`);
    });
};
start();
