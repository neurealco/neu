"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiumRequired = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const supabase_service_1 = require("../services/supabase.service");
const authenticate = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Authentication required' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        const { data, error } = await supabase_service_1.supabase.auth.admin.getUserById(decoded.sub);
        if (error || !data.user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = data.user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const premiumRequired = (req, res, next) => {
    if (!req.user || req.user.role !== 'premium') {
        return res.status(403).json({
            error: "Premium subscription required",
            upgradeUrl: "/dashboard/upgrade"
        });
    }
    next();
};
exports.premiumRequired = premiumRequired;
