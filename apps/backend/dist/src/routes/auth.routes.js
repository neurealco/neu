"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default" // Exportación por defecto
, {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authcontroller = require("../controllers/auth.controller");
const router = (0, _express.Router)();
// Rutas de autenticación
router.get("/google", _authcontroller.startAuth); // GET /auth/google
router.get("/callback", _authcontroller.authCallback);
router.get("/session", _authcontroller.getSession);
router.post("/logout", _authcontroller.logout);
const _default = router;
