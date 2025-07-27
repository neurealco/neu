import { Request, Response } from "express";
import { getAuthUrl, handleCallback } from "../services/auth.service";
import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../utils/logger.util";

export const startAuth = (req: Request, res: Response) => {
  try {
    const url = getAuthUrl();
    res.redirect(url);
  } catch (error) {
    const err = error as Error;
    logger.error(`Auth start failed: ${err.message}`);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const authCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query as { code: string };
    const user = await handleCallback(code);

    const token = jwt.sign(
      { sub: user.id, role: user.role || "user" },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      domain: new URL(config.SITE_URL).hostname,
    });

    res.redirect("/dashboard");
  } catch (error) {
    const err = error as Error;
    logger.error(`Auth callback failed: ${err.message}`);
    res.status(500).json({ error: "Authentication failed" });
  }
};

export const getSession = (req: Request, res: Response) => {
  if (!req.user) return res.status(200).json({ isAuthenticated: false });

  res.json({
    isAuthenticated: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.user_metadata?.name,
      avatar: req.user.user_metadata?.picture,
    },
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    domain: new URL(config.SITE_URL).hostname,
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
};