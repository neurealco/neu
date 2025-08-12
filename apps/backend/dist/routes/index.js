"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes"); // Importación corregida
const dashboard_routes_1 = require("./dashboard.routes"); // Importación corregida
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Rutas públicas
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
router.get("/api/test", (req, res) => {
    res.json({ status: "Backend working", time: new Date() });
});
// Rutas de autenticación
router.use("/api/auth", auth_routes_1.authRoutes);
// Rutas protegidas
router.use("/api/dashboard", auth_middleware_1.authenticate, dashboard_routes_1.dashboardRoutes);
exports.default = router;
