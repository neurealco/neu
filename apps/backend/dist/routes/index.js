"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const dashboard_routes_1 = require("./dashboard.routes");
const subscription_routes_1 = require("./subscription.routes");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Ruta de health check
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
// Rutas públicas
router.use("/api/auth", auth_routes_1.authRoutes);
// Rutas protegidas
router.use("/api/dashboard", auth_middleware_1.authenticate, dashboard_routes_1.dashboardRoutes);
router.use("/api/subscription", subscription_routes_1.subscriptionRoutes);
// Ruta de prueba
router.get("/api/test", (req, res) => {
    res.json({ status: "Backend working", time: new Date() });
});
exports.default = router;
