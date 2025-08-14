import { Router } from "express";
import { startAuth, authCallback, getSession, logout } from "../controllers/auth.controller";

const router = Router();

// Ruta GET /auth/google - Versión simplificada
router.get("/google", (req, res) => {
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${process.env.GOOGLE_CLIENT_ID}
    &redirect_uri=${process.env.SITE_URL}/api/auth/callback
    &response_type=code
    &scope=profile email https://www.googleapis.com/auth/youtube.readonly
    &access_type=offline
    &prompt=consent`.replace(/\s+/g, ''));
});

// Ruta GET /auth/callback
router.get("/callback", authCallback);

// Ruta GET /auth/session
router.get("/session", getSession);

// Ruta POST /auth/logout
router.post("/logout", logout);

export default router;