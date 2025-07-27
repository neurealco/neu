"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const theorem_controller_1 = require("../controllers/theorem.controller"); // Importación corregida
const router = (0, express_1.Router)();
router.post("/webhook", theorem_controller_1.theoremWebhook);
exports.default = router;
