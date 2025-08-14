"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "subscriptionRoutes", {
    enumerable: true,
    get: function() {
        return subscriptionRoutes;
    }
});
const _express = require("express");
const _authmiddleware = require("../middleware/auth.middleware");
const _subscriptioncontroller = require("../controllers/subscription.controller");
const router = (0, _express.Router)();
// Ruta pública para webhooks de Paddle
router.post("/webhook", _subscriptioncontroller.handlePaddleWebhook);
// Rutas protegidas para usuarios autenticados
router.use(_authmiddleware.authenticate);
// Cambio: Ruta para generar enlace y redirigir (GET)
router.get("/:plan", _subscriptioncontroller.generateSubscriptionLink); // Cambiamos a generateSubscriptionLink
router.get("/", _subscriptioncontroller.getSubscriptionDetails);
router.post("/cancel", _subscriptioncontroller.cancelSubscription);
const subscriptionRoutes = router;
