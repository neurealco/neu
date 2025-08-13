"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
const _http = require("http");
const _cacheutil = require("./utils/cache.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const server = (0, _http.createServer)(_app.default);
const start = async ()=>{
    try {
        await (0, _cacheutil.initCache)();
        console.log('✅ Redis connected');
        const port = Number(_config.default.PORT) || 8000;
        // Escuchar en 0.0.0.0 para conexiones externas
        server.listen(port, '0.0.0.0', ()=>{
            console.log(`🚀 Server running on port ${port}`);
            console.log(`🩺 Health check: http://0.0.0.0:${port}/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
start();
