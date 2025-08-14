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
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./auth.routes"));
const _dashboardroutes = require("./dashboard.routes");
const _subscriptionroutes = require("./subscription.routes");
const _authmiddleware = require("../middleware/auth.middleware");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// Ruta de health check
router.get("/health", (req, res)=>{
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
// Rutas públicas
router.use("/api/auth", _authroutes.default); // Única ruta para auth
// Rutas protegidas
router.use("/api/dashboard", _authmiddleware.authenticate, _dashboardroutes.dashboardRoutes);
router.use("/api/subscription", _authmiddleware.authenticate, _subscriptionroutes.subscriptionRoutes);
// Ruta de prueba
router.get("/api/test", (req, res)=>{
    res.json({
        status: "Backend working",
        time: new Date()
    });
});
const _default = router;
