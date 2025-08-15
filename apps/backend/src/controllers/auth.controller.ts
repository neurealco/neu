import { Request, Response } from "express";
import {
  signUpWithEmail,
  signInWithEmail,
  initiatePasswordReset,
  validateResetToken,
  resetPassword,
  changePassword as changePasswordService,
  handleCallback
} from "../services/auth.service";
import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../utils/logger.util";
import { URL } from "url";

// Configuración de cookies
const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  sameSite: "lax" as const,
  domain: config.NODE_ENV === "production" 
    ? `.${new URL(config.SITE_URL).hostname}` 
    : "localhost"
});

export const startAuth = (req: Request, res: Response) => {
  try {
    logger.info("✅ /auth/google route hit!");

    // Construir URL de autenticación manualmente
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

    logger.debug(`Generated auth URL: ${authUrl.toString()}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    const err = error as Error;
    logger.error(`🔥 Auth start failed: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const authCallback = async (req: Request, res: Response) => {
  try {
    logger.info("🔑 Auth callback initiated");
    const { code } = req.query as { code: string };
    
    if (!code) {
      logger.warn("Missing authorization code in callback");
      return res.status(400).json({ error: "Missing authorization code" });
    }

    logger.debug(`Received auth code: ${code.substring(0, 6)}...`);
    const user = await handleCallback(code);

    const token = jwt.sign(
      { sub: user.id, role: user.role || "user" },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    logger.info(`🔐 Generated JWT for user: ${user.id}`);

    res.cookie("token", token, getCookieOptions());

    logger.info("🔄 Redirecting to dashboard");
    res.redirect("/dashboard");
  } catch (error) {
    const err = error as Error;
    logger.error(`🔥 Auth callback failed: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const getSession = (req: Request, res: Response) => {
  try {
    logger.info("🔍 Session check request");
    
    if (!req.user) {
      logger.debug("No active session found");
      return res.status(200).json({ isAuthenticated: false });
    }

    logger.debug(`Active session found for user: ${req.user.id}`);
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.user_metadata?.name,
        avatar: req.user.user_metadata?.picture,
      },
    });
  } catch (error) {
    const err = error as Error;
    logger.error(`🔥 Session check failed: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Session check failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    logger.info("🚪 User logout request");
    
    res.clearCookie("token", {
      domain: config.NODE_ENV === "production" 
        ? `.${new URL(config.SITE_URL).hostname}` 
        : "localhost",
      path: "/",
    });
    
    logger.info("✅ User logged out successfully");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    const err = error as Error;
    logger.error(`🔥 Logout failed: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Logout failed" });
  }
};

export const emailSignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await signUpWithEmail(email, password);
    
    // Crear JWT para sesión
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Establecer cookie segura
    res.cookie("token", token, getCookieOptions());
    
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const emailSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await signInWithEmail(email, password);
    
    // Crear JWT para sesión
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Establecer cookie segura
    res.cookie("token", token, getCookieOptions());
    
    res.json({
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await initiatePasswordReset(email);
    
    // Respuesta genérica por seguridad
    res.json({ 
      message: "Si este email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña" 
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmPasswordReset = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    
    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Cambiado el nombre para evitar conflicto
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado" });
    }
    
    const { currentPassword, newPassword } = req.body;
    await changePasswordService(req.user.id, currentPassword, newPassword);
    
    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Endpoint para validar token de reset (usado por el frontend)
export const validateResetTokenEndpoint = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { email } = await validateResetToken(token);
    res.json({ valid: true, email });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};