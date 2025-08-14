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
// Ruta corregida con diagnóstico
router.get("/google", (req, res)=>{
    console.log("✅ Ruta /auth/google accedida");
    (0, _authcontroller.startAuth)(req, res);
});
// Resto de rutas...
router.get("/callback", _authcontroller.authCallback);
router.get("/session", _authcontroller.getSession);
router.post("/logout", _authcontroller.logout);
const _default = router;
