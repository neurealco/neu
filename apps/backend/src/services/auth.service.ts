import { google } from "googleapis";
import config from "../config";
import { supabase } from "./supabase.service";

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
    redirect_uri: `${config.SITE_URL}/api/auth/callback` 
  });
};

export const handleCallback = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Obtener info de usuario
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get();

    // Registrar/actualizar usuario en Supabase usando la API admin
    const { data: userData, error } = await supabase.auth.admin.createUser({
      email: data.email!,
      email_confirm: true,
      user_metadata: {
        name: data.name,
        picture: data.picture,
        youtube_connected: true,
      },
    });

    if (error || !userData.user) {
      throw new Error(error?.message || "User creation failed");
    }

    const user = userData.user;

    // Guardar tokens de YouTube
    await supabase.from("user_tokens").upsert({
      user_id: user.id,
      youtube_access_token: tokens.access_token,
      youtube_refresh_token: tokens.refresh_token,
      youtube_expiry: tokens.expiry_date,
    });

    return user;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Authentication failed: ${err.message}`);
  }
};
