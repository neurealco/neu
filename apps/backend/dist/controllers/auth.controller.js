"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getSession = exports.authCallback = exports.startAuth = void 0;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const startAuth = (req, res) => {
    try {
        const url = (0, auth_service_1.getAuthUrl)();
        res.redirect(url);
    }
    catch (error) {
        const err = error;
        logger_util_1.default.error(`Auth start failed: ${err.message}`);
        res.status(500).json({ error: "Authentication failed" });
    }
};
exports.startAuth = startAuth;
const authCallback = async (req, res) => {
    try {
        const { code } = req.query;
        const user = await (0, auth_service_1.handleCallback)(code);
        const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role || "user" }, config_1.default.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: config_1.default.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            domain: new URL(config_1.default.SITE_URL).hostname,
        });
        res.redirect("/dashboard");
    }
    catch (error) {
        const err = error;
        logger_util_1.default.error(`Auth callback failed: ${err.message}`);
        res.status(500).json({ error: "Authentication failed" });
    }
};
exports.authCallback = authCallback;
const getSession = (req, res) => {
    // req.user ahora es reconocido por TypeScript
    if (!req.user)
        return res.status(200).json({ isAuthenticated: false });
    res.json({
        isAuthenticated: true,
        user: {
            id: req.user.id,
            email: req.user.email,
            name: req.user.user_metadata?.name,
            avatar: req.user.user_metadata?.picture,
        },
    });
};
exports.getSession = getSession;
const logout = (req, res) => {
    res.clearCookie("token", {
        domain: new URL(config_1.default.SITE_URL).hostname,
        path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
