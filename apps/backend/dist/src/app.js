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
const _url = require("url");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
// Middlewares básicos - Solución para cookie-parser
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
// Health check mejorado
app.get("/health", (req, res)=>{
    _loggerutil.default.info("🩺 Health check passed");
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});
// Solución definitiva para /api/auth/google
app.get("/api/auth/google", (req, res)=>{
    try {
        _loggerutil.default.info("✅ SOLUCIÓN DIRECTA: /api/auth/google accedida");
        // Construir URL de autenticación manualmente
        const authUrl = new _url.URL("https://accounts.google.com/o/oauth2/v2/auth");
        authUrl.searchParams.append("client_id", _config.default.GOOGLE_CLIENT_ID);
        authUrl.searchParams.append("redirect_uri", `${_config.default.SITE_URL}/api/auth/callback`);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("scope", [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly"
        ].join(" "));
        authUrl.searchParams.append("access_type", "offline");
        authUrl.searchParams.append("prompt", "consent");
        _loggerutil.default.debug(`🔗 URL de autenticación generada: ${authUrl.toString()}`);
        res.redirect(authUrl.toString());
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`🔥 Error en solución directa: ${err.message}`, {
            stack: err.stack
        });
        res.status(500).json({
            error: "Authentication failed"
        });
    }
});
// Montar rutas principales
app.use("/api", _routes.default); // Conversión explícita
// Ruta de diagnóstico del sistema
app.get("/api/system/debug", (req, res)=>{
    const routes = app._router.stack.filter((layer)=>layer.route).map((layer)=>({
            path: layer.route.path,
            methods: Object.keys(layer.route.methods)
        }));
    res.json({
        node: process.version,
        environment: _config.default.NODE_ENV,
        routes: routes,
        time: new Date().toISOString()
    });
});
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
