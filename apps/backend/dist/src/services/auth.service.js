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
        prompt: "consent",
        redirect_uri: `${_config.default.SITE_URL}/api/auth/callback`
    });
};
const handleCallback = async (code)=>{
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Obtener info de usuario
        const oauth2 = _googleapis.google.oauth2({
            version: "v2",
            auth: oauth2Client
        });
        const { data } = await oauth2.userinfo.get();
        // Registrar/actualizar usuario en Supabase
        const { data: userData, error } = await _supabaseservice.supabase.auth.admin.createUser({
            email: data.email,
            email_confirm: true,
            user_metadata: {
                name: data.name,
                picture: data.picture,
                youtube_connected: true
            }
        });
        if (error || !userData.user) {
            throw new Error(error?.message || "User creation failed");
        }
        const user = userData.user;
        // Guardar tokens de YouTube
        await _supabaseservice.supabase.from("youtube_tokens").upsert({
            user_id: user.id,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date
        });
        // Establecer el plan free (persistente)
        await _supabaseservice.supabase.from('profiles').update({
            subscription_plan: 'free'
        }).eq('id', user.id);
        return user;
    } catch (error) {
        const err = error;
        throw new Error(`Authentication failed: ${err.message}`);
    }
};
