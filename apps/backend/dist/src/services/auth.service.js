"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getAuthUrl () {
        return getAuthUrl;
    },
    get handleCallback () {
        return handleCallback;
    }
});
const _googleapis = require("googleapis");
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
const _supabaseservice = require("./supabase.service");
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("../utils/logger.util"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const oauth2Client = new _googleapis.google.auth.OAuth2(_config.default.GOOGLE_CLIENT_ID, _config.default.GOOGLE_CLIENT_SECRET, `${_config.default.SITE_URL}/api/auth/callback`);
const getAuthUrl = ()=>{
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtube.readonly"
        ],
        prompt: "consent"
    });
};
const handleCallback = async (code)=>{
    try {
        _loggerutil.default.debug("Obteniendo tokens de Google...");
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Obtener información del usuario
        const oauth2 = _googleapis.google.oauth2({
            version: "v2",
            auth: oauth2Client
        });
        const { data } = await oauth2.userinfo.get();
        if (!data.email || !data.id) {
            throw new Error("Datos de usuario incompletos de Google");
        }
        _loggerutil.default.debug(`Registrando/actualizando usuario: ${data.email}`);
        const { data: userData, error } = await _supabaseservice.supabase.auth.admin.createUser({
            email: data.email,
            email_confirm: true,
            user_metadata: {
                name: data.name,
                picture: data.picture,
                google_id: data.id
            }
        });
        if (error || !userData.user) {
            _loggerutil.default.error("Error creando usuario en Supabase", error);
            throw new Error(error?.message || "User creation failed");
        }
        const user = userData.user;
        _loggerutil.default.info(`Usuario registrado: ${user.id}`);
        // Guardar tokens de YouTube
        _loggerutil.default.debug("Guardando tokens de YouTube...");
        await _supabaseservice.supabase.from("youtube_tokens").upsert({
            user_id: user.id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date
        });
        // Establecer plan free
        _loggerutil.default.debug("Estableciendo plan free...");
        await _supabaseservice.supabase.from('profiles').upsert({
            id: user.id,
            subscription_plan: 'free'
        });
        return user;
    } catch (error) {
        const err = error;
        _loggerutil.default.error(`Authentication failed: ${err.message}`, {
            stack: err.stack
        });
        throw new Error(`Authentication failed: ${err.message}`);
    }
};
