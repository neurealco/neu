import { Request, Response } from "express";
import { handleCallback } from "../services/auth.service";
import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../utils/logger.util";
import { URL } from "url";

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      domain: new URL(config.SITE_URL).hostname,
    });

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
      domain: new URL(config.SITE_URL).hostname,
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