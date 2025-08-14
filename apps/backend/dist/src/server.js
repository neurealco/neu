"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
const _config = /*#__PURE__*/ _interop_require_default(require("./config"));
const _http = require("http");
const _cacheutil = require("./utils/cache.util");
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("./utils/logger.util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const server = (0, _http.createServer)(_app.default);
const start = async ()=>{
    try {
        await (0, _cacheutil.initCache)();
        _loggerutil.default.info('✅ Redis conectado');
        const port = Number(_config.default.PORT) || 8000;
        server.listen(port, '0.0.0.0', ()=>{
            _loggerutil.default.info(`🚀 Servidor ejecutándose en puerto ${port}`);
            _loggerutil.default.info(`🩺 Health check: http://0.0.0.0:${port}/health`);
            // Forzar el evento mount manualmente
            _app.default.emit('mount');
        });
    } catch (error) {
        _loggerutil.default.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};
start();
