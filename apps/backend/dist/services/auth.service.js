"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCallback = exports.getAuthUrl = void 0;
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../config"));
const supabase_service_1 = require("./supabase.service");
const oauth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.GOOGLE_CLIENT_ID, config_1.default.GOOGLE_CLIENT_SECRET, `${config_1.default.SITE_URL}/api/auth/callback`);
const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly",
        ],
        prompt: "consent",
        redirect_uri: `${config_1.default.SITE_URL}/api/auth/callback`
    });
};
exports.getAuthUrl = getAuthUrl;
const handleCallback = async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Obtener info de usuario
        const oauth2 = googleapis_1.google.oauth2({
            version: "v2",
            auth: oauth2Client,
        });
        const { data } = await oauth2.userinfo.get();
        // Registrar/actualizar usuario en Supabase usando la API admin
        const { data: userData, error } = await supabase_service_1.supabase.auth.admin.createUser({
            email: data.email,
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
        await supabase_service_1.supabase.from("user_tokens").upsert({
            user_id: user.id,
            youtube_access_token: tokens.access_token,
            youtube_refresh_token: tokens.refresh_token,
            youtube_expiry: tokens.expiry_date,
        });
        return user;
    }
    catch (error) {
        const err = error;
        throw new Error(`Authentication failed: ${err.message}`);
    }
};
exports.handleCallback = handleCallback;
