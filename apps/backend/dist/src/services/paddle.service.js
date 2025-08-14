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
    get PaddleService () {
        return PaddleService;
    },
    get paddleService () {
        return paddleService;
    }
});
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
const _supabaseservice = require("./supabase.service");
const _loggerutil = /*#__PURE__*/ _interop_require_default(require("../utils/logger.util"));
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class PaddleService {
    static getInstance() {
        if (!PaddleService.instance) {
            PaddleService.instance = new PaddleService();
        }
        return PaddleService.instance;
    }
    /**
   * Genera un enlace de checkout para suscripción
   */ async generateSubscriptionLink(userId, plan, email) {
        try {
            // Obtener IDs de planes desde la configuración
            const plusPlanId = _config.default.PADDLE_PLUS_PLAN_ID;
            const proPlanId = _config.default.PADDLE_PRO_PLAN_ID;
            if (!plusPlanId || !proPlanId) {
                throw new Error('Paddle plan IDs are not configured');
            }
            const planId = plan === 'plus' ? plusPlanId : proPlanId;
            const response = await _axios.default.post(`${_config.default.PADDLE_CHECKOUT_URL}/api/2.0/product/generate_pay_link`, {
                vendor_id: _config.default.PADDLE_VENDOR_ID,
                vendor_auth_code: _config.default.PADDLE_API_KEY,
                product_id: planId,
                customer_email: email,
                passthrough: JSON.stringify({
                    userId
                }),
                return_url: `${_config.default.SITE_URL}/dashboard?success=true`
            });
            if (response.data.success) {
                return response.data.response.url;
            }
            throw new Error('Failed to generate subscription link');
        } catch (error) {
            _loggerutil.default.error('Paddle subscription link error', error);
            throw new Error('Failed to generate subscription link');
        }
    }
    /**
   * Verifica la firma de los webhooks de Paddle
   */ verifyWebhookSignature(payload, signature) {
        const publicKey = _config.default.PADDLE_PUBLIC_KEY;
        if (!publicKey) {
            _loggerutil.default.error('Paddle public key is not configured');
            return false;
        }
        try {
            const verifier = _crypto.default.createVerify('sha1');
            verifier.update(JSON.stringify(payload));
            return verifier.verify(`-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`, signature, 'base64');
        } catch (error) {
            _loggerutil.default.error('Paddle signature verification error', error);
            return false;
        }
    }
    /**
   * Procesa eventos de webhook de Paddle
   */ async handleWebhookEvent(event) {
        if (!event.alert_name) return;
        try {
            // Extraer userId del passthrough o del customer_user_id
            let userId = event.passthrough?.userId || event.customer_user_id;
            if (!userId) {
                _loggerutil.default.warn('Paddle webhook event without user ID', event);
                return;
            }
            // Obtener IDs de planes desde la configuración
            const plusPlanId = _config.default.PADDLE_PLUS_PLAN_ID;
            const proPlanId = _config.default.PADDLE_PRO_PLAN_ID;
            if (!plusPlanId || !proPlanId) {
                throw new Error('Paddle plan IDs are not configured');
            }
            switch(event.alert_name){
                case 'subscription_created':
                case 'subscription_updated':
                    await this.updateUserSubscription(userId, event, plusPlanId, proPlanId);
                    break;
                case 'subscription_cancelled':
                case 'subscription_payment_failed':
                    await this.downgradeToFree(userId);
                    break;
                case 'subscription_payment_succeeded':
                    await this.updatePaymentStatus(userId, event);
                    break;
            }
        } catch (error) {
            _loggerutil.default.error('Paddle webhook processing error', error);
        }
    }
    async updateUserSubscription(userId, event, plusPlanId, proPlanId) {
        // Determinar el plan basado en el ID del plan de suscripción
        const plan = event.subscription_plan_id === plusPlanId ? 'plus' : event.subscription_plan_id === proPlanId ? 'pro' : 'free';
        await _supabaseservice.supabase.from('profiles').update({
            subscription_plan: plan,
            paddle_subscription_id: event.subscription_id,
            next_payment_date: event.next_payment_date,
            paddle_update_url: event.update_url,
            paddle_cancel_url: event.cancel_url
        }).eq('id', userId);
    }
    async downgradeToFree(userId) {
        await _supabaseservice.supabase.from('profiles').update({
            subscription_plan: 'free',
            paddle_subscription_id: null,
            next_payment_date: null,
            paddle_update_url: null,
            paddle_cancel_url: null
        }).eq('id', userId);
    }
    async updatePaymentStatus(userId, event) {
        await _supabaseservice.supabase.from('profiles').update({
            next_payment_date: event.next_payment_date,
            last_payment_date: new Date().toISOString()
        }).eq('id', userId);
    }
    constructor(){}
}
_define_property(PaddleService, "instance", void 0);
const paddleService = PaddleService.getInstance();
