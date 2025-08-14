import { Router } from "express";
import { authCallback, getSession, logout } from "../controllers/auth.controller";
import config from "../config";

const router = Router();

router.get("/google", (req, res) => {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", config.GOOGLE_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", `${config.SITE_URL}/api/auth/callback`);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("scope", [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/youtube.readonly"
  ].join(" "));
  authUrl.searchParams.append("access_type", "offline");
  authUrl.searchParams.append("prompt", "consent");

  res.redirect(authUrl.toString());
});

// Ruta GET /auth/callback
router.get("/callback", authCallback);

// Ruta GET /auth/session
router.get("/session", getSession);

// Ruta POST /auth/logout
router.post("/logout", logout);

export default router;