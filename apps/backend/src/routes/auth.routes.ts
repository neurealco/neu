import { Router } from "express";
import {
  startAuth,
  authCallback,
  getSession,
  logout,
} from "../controllers/auth.controller";

const router = Router();

router.get("/login", startAuth);
router.get("/callback", authCallback);
router.get("/session", getSession);
router.post("/logout", logout);
router.get("/google", startAuth);

// Exportar como objeto nombrado
export const authRoutes = router;