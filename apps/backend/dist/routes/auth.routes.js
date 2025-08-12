"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/login", auth_controller_1.startAuth);
router.get("/callback", auth_controller_1.authCallback);
router.get("/session", auth_controller_1.getSession);
router.post("/logout", auth_controller_1.logout);
router.get("/google", auth_controller_1.startAuth);
// Exportar como objeto nombrado
exports.authRoutes = router;
