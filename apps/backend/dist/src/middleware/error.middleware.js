"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get UsageLimitExceededError () {
        return UsageLimitExceededError;
    },
    get errorHandler () {
        return errorHandler;
    }
});
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("../utils/logger.util"));
const _ratelimiterflexible = require("rate-limiter-flexible");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const errorHandler = (err, req, res, next)=>{
    // Log error details
    _loggerutil.default.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // Handle specific error types
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
    if (err.name === 'UsageLimitExceededError') {
        return res.status(429).json({
            error: 'Monthly usage limit exceeded',
            feature: err.feature,
            limit: err.limit,
            current: err.current
        });
    }
    if (err instanceof _ratelimiterflexible.RateLimiterRes) {
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: err.msBeforeNext / 1000
        });
    }
    // Generic error handling
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        error: message
    });
};
class UsageLimitExceededError extends Error {
    constructor(feature, limit, current){
        super(`Usage limit exceeded for feature: ${feature}`), _define_property(this, "feature", void 0), _define_property(this, "limit", void 0), _define_property(this, "current", void 0), this.feature = feature, this.limit = limit, this.current = current;
        this.name = 'UsageLimitExceededError';
    }
}
