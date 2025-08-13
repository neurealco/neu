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
        const url = (0, _authservice.getAuthUrl)();
        res.redirect(url);
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`Auth start failed: ${err.message}`);
        res.status(500).json({
            error: "Authentication failed"
        });
    }
};
const authCallback = async (req, res)=>{
    try {
        const { code } = req.query;
        const user = await (0, _authservice.handleCallback)(code);
        const token = _jsonwebtoken.default.sign({
            sub: user.id,
            role: user.role || "user"
        }, _config.default.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: _config.default.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            domain: new URL(_config.default.SITE_URL).hostname
        });
        res.redirect("/dashboard");
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`Auth callback failed: ${err.message}`);
        res.status(500).json({
            error: "Authentication failed"
        });
    }
};
const getSession = (req, res)=>{
    // req.user ahora es reconocido por TypeScript
    if (!req.user) return res.status(200).json({
        isAuthenticated: false
    });
    res.json({
        isAuthenticated: true,
        user: {
            id: req.user.id,
            email: req.user.email,
            name: req.user.user_metadata?.name,
            avatar: req.user.user_metadata?.picture
        }
    });
};
const logout = (req, res)=>{
    res.clearCookie("token", {
        domain: new URL(_config.default.SITE_URL).hostname,
        path: "/"
    });
    res.status(200).json({
        message: "Logged out successfully"
    });
};
