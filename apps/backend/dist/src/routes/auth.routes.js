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
const router = (0, _express.Router)();
// Ruta GET /auth/google - Versión simplificada
router.get("/google", (req, res)=>{
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${process.env.GOOGLE_CLIENT_ID}
    &redirect_uri=${process.env.SITE_URL}/api/auth/callback
    &response_type=code
    &scope=profile email https://www.googleapis.com/auth/youtube.readonly
    &access_type=offline
    &prompt=consent`.replace(/\s+/g, ''));
});
// Ruta GET /auth/callback
router.get("/callback", _authcontroller.authCallback);
// Ruta GET /auth/session
router.get("/session", _authcontroller.getSession);
// Ruta POST /auth/logout
router.post("/logout", _authcontroller.logout);
const _default = router;
