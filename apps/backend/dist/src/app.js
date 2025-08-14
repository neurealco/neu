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
const _rateLimitutil = require("./utils/rateLimit.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
// Solución 1: Usar una sintaxis alternativa para cookie-parser
const cookieParser = _cookieparser.default;
app.use(cookieParser());
// Solución 2: Usar require en lugar de import
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.get("/api/auth/google", (req, res)=>{
    console.log("⚠️ Usando ruta de emergencia");
    res.redirect("https://google.com"); // Prueba simple
});
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
// Health check
app.get("/health", (req, res)=>{
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString()
    });
});
app.use((0, _rateLimitutil.rateLimitMiddleware)(_rateLimitutil.apiRateLimiter));
// Ruta de prueba
app.get("/api/test", (req, res)=>{
    res.json({
        status: "Backend working",
        time: new Date()
    });
});
app.get('/api/routes/debug', (req, res)=>{
    const routes = [];
    app._router.stack.forEach((layer)=>{
        if (layer.route) {
            routes.push({
                path: layer.route.path,
                methods: Object.keys(layer.route.methods)
            });
        } else if (layer.name === 'router') {
            layer.handle.stack.forEach((sublayer)=>{
                if (sublayer.route) {
                    routes.push({
                        path: sublayer.route.path,
                        methods: Object.keys(sublayer.route.methods)
                    });
                }
            });
        }
    });
    res.json({
        message: "Rutas registradas",
        routes: routes
    });
});
app.use((req, res, next)=>{
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    next();
});
// Montar rutas principales
app.use("/api", _routes.default);
// Error handling
app.use(_errormiddleware.errorHandler);
function printRoutes(layer, prefix = "") {
    if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
        console.log(`[ROUTE] ${methods} ${prefix}${layer.route.path}`);
    } else if (layer.name === "router" && layer.handle.stack) {
        const newPrefix = prefix + layer.regexp.source.replace("\\/", "/").replace("(?=\\/|$)", "").replace("/^", "").replace("\\/?(?=/|$)", "");
        layer.handle.stack.forEach((sublayer)=>{
            printRoutes(sublayer, newPrefix);
        });
    }
}
console.log("===== RUTAS REGISTRADAS =====");
app._router.stack.forEach((layer)=>printRoutes(layer));
console.log("==============================");
const _default = app;
