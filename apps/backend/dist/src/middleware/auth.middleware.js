"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticate", {
    enumerable: true,
    get: function() {
        return authenticate;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
const _supabaseservice = require("../services/supabase.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticate = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({
        error: 'Authentication required'
    });
    try {
        const decoded = _jsonwebtoken.default.verify(token, _config.default.JWT_SECRET);
        const { data, error } = await _supabaseservice.supabase.auth.admin.getUserById(decoded.sub);
        if (error || !data.user) {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }
        // Asignar usuario a req.user (TypeScript ahora lo reconoce)
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};
