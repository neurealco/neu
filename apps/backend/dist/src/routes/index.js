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
const _authmiddleware = require("../middleware/auth.middleware");
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./auth.routes"));
const _dashboardroutes = require("./dashboard.routes");
const _subscriptionroutes = require("./subscription.routes");
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("../utils/logger.util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// Middleware de diagnóstico para todas las rutas
router.use((req, res, next)=>{
    _loggerutil.default.info(`📭 Route accessed: ${req.method} ${req.originalUrl}`);
    next();
});
// Health check
router.get("/health", (req, res)=>{
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
// Montar authRoutes
router.use("/auth", _authroutes.default);
_loggerutil.default.info("✅ Auth routes mounted successfully");
// Montar dashboardRoutes (protegidas)
router.use("/dashboard", _authmiddleware.authenticate, _dashboardroutes.dashboardRoutes);
_loggerutil.default.info("✅ Dashboard routes mounted successfully");
// Montar subscriptionRoutes
router.use("/subscription", _subscriptionroutes.subscriptionRoutes);
_loggerutil.default.info("✅ Subscription routes mounted successfully");
// Ruta de prueba
router.get("/test", (req, res)=>{
    res.json({
        status: "Backend working",
        time: new Date()
    });
});
// Ruta de diagnóstico de rutas registradas
router.get("/route-debug", (req, res)=>{
    const routes = [];
    // Función recursiva para recolectar rutas
    const getRoutes = (layer, prefix = "")=>{
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).map((method)=>method.toUpperCase());
            routes.push({
                method: methods.join(','),
                path: `${prefix}${layer.route.path}`
            });
        } else if (layer.name === "router" && layer.handle.stack) {
            const newPrefix = prefix + layer.regexp.source.replace("\\/?(?=\\/|$)", "").replace("^", "").replace("\\", "");
            layer.handle.stack.forEach((sublayer)=>{
                getRoutes(sublayer, newPrefix);
            });
        }
    };
    router.stack.forEach((layer)=>getRoutes(layer));
    res.json({
        routes
    });
});
const _default = router;
