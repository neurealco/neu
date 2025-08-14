"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get authCallback () {
        return authCallback;
    },
    get getSession () {
        return getSession;
    },
    get logout () {
        return logout;
    },
    get startAuth () {
        return startAuth;
    }
});
const _authservice = require("../services/auth.service");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("../utils/logger.util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const startAuth = (req, res)=>{
    try {
        // Log de diagnóstico
        _loggerutil.default.info("✅ /auth/google route hit!");
        const url = (0, _authservice.getAuthUrl)();
        _loggerutil.default.debug(`Generated auth URL: ${url}`);
        res.redirect(url);
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`🔥 Auth start failed: ${err.message}`, {
            stack: err.stack
        });
        res.status(500).json({
            error: "Authentication failed"
        });
    }
};
const authCallback = async (req, res)=>{
    try {
        _loggerutil.default.info("🔑 Auth callback initiated");
        const { code } = req.query;
        if (!code) {
            _loggerutil.default.warn("Missing authorization code in callback");
            return res.status(400).json({
                error: "Missing authorization code"
            });
        }
        _loggerutil.default.debug(`Received auth code: ${code.substring(0, 6)}...`);
        const user = await (0, _authservice.handleCallback)(code);
        const token = _jsonwebtoken.default.sign({
            sub: user.id,
            role: user.role || "user"
        }, _config.default.JWT_SECRET, {
            expiresIn: "7d"
        });
        _loggerutil.default.info(`🔐 Generated JWT for user: ${user.id}`);
        res.cookie("token", token, {
            httpOnly: true,
            secure: _config.default.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            domain: new URL(_config.default.SITE_URL).hostname
        });
        _loggerutil.default.info("🔄 Redirecting to dashboard");
        res.redirect("/dashboard");
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`🔥 Auth callback failed: ${err.message}`, {
            stack: err.stack
        });
        res.status(500).json({
            error: "Authentication failed"
        });
    }
};
const getSession = (req, res)=>{
    try {
        _loggerutil.default.info("🔍 Session check request");
        if (!req.user) {
            _loggerutil.default.debug("No active session found");
            return res.status(200).json({
                isAuthenticated: false
            });
        }
        _loggerutil.default.debug(`Active session found for user: ${req.user.id}`);
        res.json({
            isAuthenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.user_metadata?.name,
                avatar: req.user.user_metadata?.picture
            }
        });
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`🔥 Session check failed: ${err.message}`, {
            stack: err.stack
        });
        res.status(500).json({
            error: "Session check failed"
        });
    }
};
const logout = (req, res)=>{
    try {
        _loggerutil.default.info("🚪 User logout request");
        res.clearCookie("token", {
            domain: new URL(_config.default.SITE_URL).hostname,
            path: "/"
        });
        _loggerutil.default.info("✅ User logged out successfully");
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`🔥 Logout failed: ${err.message}`, {
            stack: err.stack
        });
        res.status(500).json({
            error: "Logout failed"
        });
    }
};
