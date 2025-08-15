import { Router } from "express";
import { 
  startAuth, 
  authCallback, 
  getSession, 
  logout,
  emailSignUp,
  emailSignIn,
  requestPasswordReset,
  confirmPasswordReset,
  changeUserPassword, // Cambiado el nombre
  validateResetTokenEndpoint
} from "../controllers/auth.controller";
import config from "../config";
import { authRateLimiter } from "../utils/rateLimit.util";
import { authenticate } from "../middleware/auth.middleware";
import { rateLimitMiddleware } from "../utils/rateLimit.util"; // Importar el middleware

const router = Router();

// Google OAuth
router.get("/google", startAuth);
router.get("/callback", authCallback);

// Session management
router.get("/session", getSession);
router.post("/logout", logout);

// Email/password authentication
router.post("/signup/email", rateLimitMiddleware(authRateLimiter), emailSignUp);
router.post("/login/email", rateLimitMiddleware(authRateLimiter), emailSignIn);

// Password reset flow
router.post("/forgot-password", rateLimitMiddleware(authRateLimiter), requestPasswordReset);
router.post("/reset-password", rateLimitMiddleware(authRateLimiter), confirmPasswordReset);
router.get("/validate-reset-token/:token", validateResetTokenEndpoint);

// Authenticated password change (usando el nuevo nombre)
router.post("/change-password", authenticate, rateLimitMiddleware(authRateLimiter), changeUserPassword);

export default router;