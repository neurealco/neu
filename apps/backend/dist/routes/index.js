"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const credits_routes_1 = __importDefault(require("./credits.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const theorem_routes_1 = __importDefault(require("./theorem.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.authRoutes);
router.use("/credits", credits_routes_1.default);
router.use("/dashboard", dashboard_routes_1.default);
router.use("/theorem", theorem_routes_1.default);
exports.default = router;
