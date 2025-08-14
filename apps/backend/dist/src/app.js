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
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
const _routes = /*#__PURE__*/ _interop_require_default(require("./routes"));
const _errormiddleware = require("./middleware/error.middleware");
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("./utils/logger.util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
// Middlewares básicos
app.use((0, _cookieparser.default)());
app.use((0, _cors.default)({
    origin: _config.default.SITE_URL,
    credentials: true,
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}));
app.use(_express.default.json());
// Middleware de diagnóstico de solicitudes
app.use((req, res, next)=>{
    _loggerutil.default.info(`🌐 Solicitud recibida: ${req.method} ${req.originalUrl}`);
    next();
});
// Montar rutas principales
app.use("/", _routes.default);
// Middleware de errores
app.use(_errormiddleware.errorHandler);
// Diagnóstico de rutas al iniciar
app.on("mount", ()=>{
    _loggerutil.default.info("🚀 Aplicación iniciada");
    const routes = app._router.stack.filter((layer)=>layer.route).map((layer)=>({
            path: layer.route.path,
            methods: Object.keys(layer.route.methods)
        }));
    _loggerutil.default.info("📋 Rutas registradas:", {
        routes
    });
});
const _default = app;
