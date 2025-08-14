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
const _express = require("express");
const _authcontroller = require("../controllers/auth.controller");
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// Ruta GET /auth/google
router.get("/google", (req, res)=>{
    try {
        // Construir URL de autenticación manualmente
        const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        authUrl.searchParams.append("client_id", _config.default.GOOGLE_CLIENT_ID);
        authUrl.searchParams.append("redirect_uri", `${_config.default.SITE_URL}/api/auth/callback`);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("scope", [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly"
        ].join(" "));
        authUrl.searchParams.append("access_type", "offline");
        authUrl.searchParams.append("prompt", "consent");
        res.redirect(authUrl.toString());
    } catch (error) {
        const err = error;
        res.status(500).json({
            error: "Authentication failed"
        });
    }
});
// Ruta GET /auth/callback
router.get("/callback", _authcontroller.authCallback);
// Ruta GET /auth/session
router.get("/session", _authcontroller.getSession);
// Ruta POST /auth/logout
router.post("/logout", _authcontroller.logout);
const _default = router;
