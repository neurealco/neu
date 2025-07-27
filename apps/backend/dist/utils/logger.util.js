"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Logger simple sin dependencias
const logLevels = ["error", "warn", "info", "http", "debug"];
const getTimestamp = () => {
    const date = new Date();
    return date.toISOString();
};
const shouldLog = (level) => {
    const currentLevel = process.env.NODE_ENV === "production" ? "info" : "debug";
    const levelIndex = logLevels.indexOf(level);
    const currentIndex = logLevels.indexOf(currentLevel);
    return levelIndex <= currentIndex;
};
const log = (level, message, ...meta) => {
    if (!shouldLog(level))
        return;
    const timestamp = getTimestamp();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    if (meta.length > 0) {
        console.log(formattedMessage, ...meta);
    }
    else {
        console.log(formattedMessage);
    }
};
const logger = {
    error: (message, ...meta) => log("error", message, ...meta),
    warn: (message, ...meta) => log("warn", message, ...meta),
    info: (message, ...meta) => log("info", message, ...meta),
    http: (message, ...meta) => log("http", message, ...meta),
    debug: (message, ...meta) => log("debug", message, ...meta),
};
exports.default = logger;
