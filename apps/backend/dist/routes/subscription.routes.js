"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const subscription_controller_1 = require("../controllers/subscription.controller");
const router = (0, express_1.Router)();
// Ruta pública para webhooks de Paddle
router.post("/webhook", subscription_controller_1.handlePaddleWebhook);
// Rutas protegidas para usuarios autenticados
router.use(auth_middleware_1.authenticate);
router.get("/:plan", subscription_controller_1.getSubscriptionLink);
router.get("/", subscription_controller_1.getSubscriptionDetails);
router.post("/cancel", subscription_controller_1.cancelSubscription);
exports.subscriptionRoutes = router;
