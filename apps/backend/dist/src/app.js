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
// Solución para cookie-parser
const cookieParser = _cookieparser.default;
app.use(cookieParser());
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
    _loggerutil.default.http(`${req.method} ${req.originalUrl}`, {
        ip: req.ip,
        headers: req.headers,
        cookies: req.cookies
    });
    next();
});
// Health check
app.get("/health", (req, res)=>{
    _loggerutil.default.info("🩺 Health check passed");
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});
// Montar rutas principales
app.use("/api", _routes.default);
// Middleware de error
app.use(_errormiddleware.errorHandler);
// ===== DIAGNÓSTICO DE RUTAS CORREGIDO =====
function printRoutes(layer, prefix = "", depth = 0) {
    const indent = "  ".repeat(depth);
    if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
        _loggerutil.default.debug(`${indent}[ROUTE] ${methods} ${prefix}${layer.route.path}`);
    } else if (layer.name === "router" && layer.handle.stack) {
        // Expresión regular simplificada y corregida
        const regexStr = layer.regexp.toString().replace(/^\/\^/, "").replace(/\\\//g, "/").replace(/\(\?=\\\/\|\$\)\//, "").replace(/\/i$/, "");
        const newPrefix = prefix + regexStr;
        _loggerutil.default.debug(`${indent}[ROUTER] ${newPrefix}`);
        layer.handle.stack.forEach((sublayer)=>{
            printRoutes(sublayer, newPrefix, depth + 1);
        });
    } else if (layer.name) {
        _loggerutil.default.debug(`${indent}[MIDDLEWARE] ${layer.name}`);
    }
}
// Diagnóstico después de inicializar
app.on("mount", ()=>{
    _loggerutil.default.info("===== INICIO DE DIAGNÓSTICO DE RUTAS =====");
    app._router.stack.forEach((layer)=>printRoutes(layer));
    _loggerutil.default.info("===== FIN DE DIAGNÓSTICO DE RUTAS =====");
});
const _default = app;
