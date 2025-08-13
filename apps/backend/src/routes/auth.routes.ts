import { Router } from "express";
import { startAuth, authCallback, getSession, logout } from "../controllers/auth.controller";

const router = Router();

// Rutas de autenticación
router.get("/google", startAuth); // GET /auth/google
router.get("/callback", authCallback);
router.get("/session", getSession);
router.post("/logout", logout);

export default router; // Exportación por defecto