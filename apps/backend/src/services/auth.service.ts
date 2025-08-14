import { google } from "googleapis";
import config from "../config";
import { supabase } from "./supabase.service";
import logger from "../utils/logger.util";

const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  `${config.SITE_URL}/api/auth/callback`
);

export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
    prompt: "consent",
  });
};

export const handleCallback = async (code: string) => {
  try {
    logger.debug("Obteniendo tokens de Google...");
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Obtener información del usuario
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get();
    
    if (!data.email || !data.id) {
      throw new Error("Datos de usuario incompletos de Google");
    }

    logger.debug(`Registrando/actualizando usuario: ${data.email}`);
    const { data: userData, error } = await supabase.auth.admin.createUser({
      email: data.email,
      email_confirm: true,
      user_metadata: {
        name: data.name,
        picture: data.picture,
        google_id: data.id,
      },
    });

    if (error || !userData.user) {
      logger.error("Error creando usuario en Supabase", error);
      throw new Error(error?.message || "User creation failed");
    }

    const user = userData.user;
    logger.info(`Usuario registrado: ${user.id}`);

    // Guardar tokens de YouTube
    logger.debug("Guardando tokens de YouTube...");
    await supabase.from("youtube_tokens").upsert({
      user_id: user.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    });

    // Establecer plan free
    logger.debug("Estableciendo plan free...");
    await supabase.from('profiles').upsert({
      id: user.id,
      subscription_plan: 'free',
    });

    return user;
  } catch (error) {
    const err = error as Error;
    logger.error(`Authentication failed: ${err.message}`, { stack: err.stack });
    throw new Error(`Authentication failed: ${err.message}`);
  }
};