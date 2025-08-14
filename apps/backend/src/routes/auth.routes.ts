import { Router } from "express";
import { startAuth, authCallback, getSession, logout } from "../controllers/auth.controller";

const router = Router();

// Ruta corregida con diagnóstico
router.get("/google", (req, res) => {
  console.log("✅ Ruta /auth/google accedida");
  startAuth(req, res);
});

// Resto de rutas...
router.get("/callback", authCallback);
router.get("/session", getSession);
router.post("/logout", logout);

export default router;