"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dashboardRoutes", {
    enumerable: true,
    get: function() {
        return dashboardRoutes;
    }
});
const _express = require("express");
const _authmiddleware = require("../middleware/auth.middleware");
const _dashboardcontroller = require("../controllers/dashboard.controller");
const router = (0, _express.Router)();
router.use(_authmiddleware.authenticate);
router.get("/", _dashboardcontroller.getDashboardData);
router.post("/refresh", _dashboardcontroller.refreshStats);
const dashboardRoutes = router;
