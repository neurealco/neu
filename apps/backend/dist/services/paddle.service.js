"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paddleService = exports.PaddleService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const supabase_service_1 = require("./supabase.service");
const logger_util_1 = __importDefault(require("../utils/logger.util"));
const crypto_1 = __importDefault(require("crypto"));
class PaddleService {
    constructor() { }
    static getInstance() {
        if (!PaddleService.instance) {
            PaddleService.instance = new PaddleService();
        }
        return PaddleService.instance;
    }
    /**
     * Genera un enlace de checkout para suscripción
     */
    async generateSubscriptionLink(userId, plan, email) {
        try {
            // Obtener IDs de planes desde la configuración
            const plusPlanId = config_1.default.PADDLE_PLUS_PLAN_ID;
            const proPlanId = config_1.default.PADDLE_PRO_PLAN_ID;
            if (!plusPlanId || !proPlanId) {
                throw new Error('Paddle plan IDs are not configured');
            }
            const planId = plan === 'plus' ? plusPlanId : proPlanId;
            const response = await axios_1.default.post(`${config_1.default.PADDLE_CHECKOUT_URL}/api/2.0/product/generate_pay_link`, {
                vendor_id: config_1.default.PADDLE_VENDOR_ID,
                vendor_auth_code: config_1.default.PADDLE_API_KEY,
                product_id: planId,
                customer_email: email,
                passthrough: JSON.stringify({ userId }),
                return_url: `${config_1.default.SITE_URL}/dashboard?success=true`,
            });
            if (response.data.success) {
                return response.data.response.url;
            }
            throw new Error('Failed to generate subscription link');
        }
        catch (error) {
            logger_util_1.default.error('Paddle subscription link error', error);
            throw new Error('Failed to generate subscription link');
        }
    }
    /**
     * Verifica la firma de los webhooks de Paddle
     */
    verifyWebhookSignature(payload, signature) {
        const publicKey = config_1.default.PADDLE_PUBLIC_KEY;
        if (!publicKey) {
            logger_util_1.default.error('Paddle public key is not configured');
            return false;
        }
        try {
            const verifier = crypto_1.default.createVerify('sha1');
            verifier.update(JSON.stringify(payload));
            return verifier.verify(`-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`, signature, 'base64');
        }
        catch (error) {
            logger_util_1.default.error('Paddle signature verification error', error);
            return false;
        }
    }
    /**
     * Procesa eventos de webhook de Paddle
     */
    async handleWebhookEvent(event) {
        if (!event.alert_name)
            return;
        try {
            const userId = event.passthrough?.userId || event.customer_user_id;
            if (!userId) {
                logger_util_1.default.warn('Paddle webhook event without user ID', event);
                return;
            }
            // Obtener IDs de planes desde la configuración
            const plusPlanId = config_1.default.PADDLE_PLUS_PLAN_ID;
            const proPlanId = config_1.default.PADDLE_PRO_PLAN_ID;
            if (!plusPlanId || !proPlanId) {
                throw new Error('Paddle plan IDs are not configured');
            }
            switch (event.alert_name) {
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
        }
        catch (error) {
            logger_util_1.default.error('Paddle webhook processing error', error);
        }
    }
    async updateUserSubscription(userId, event, plusPlanId, proPlanId) {
        const plan = event.subscription_plan_id === plusPlanId
            ? 'plus'
            : event.subscription_plan_id === proPlanId
                ? 'pro'
                : 'free';
        await supabase_service_1.supabase
            .from('profiles')
            .update({
            subscription_plan: plan,
            paddle_subscription_id: event.subscription_id,
            next_payment_date: event.next_payment_date,
            paddle_update_url: event.update_url,
            paddle_cancel_url: event.cancel_url,
        })
            .eq('id', userId);
    }
    async downgradeToFree(userId) {
        await supabase_service_1.supabase
            .from('profiles')
            .update({
            subscription_plan: 'free',
            paddle_subscription_id: null,
            next_payment_date: null,
            paddle_update_url: null,
            paddle_cancel_url: null,
        })
            .eq('id', userId);
    }
    async updatePaymentStatus(userId, event) {
        await supabase_service_1.supabase
            .from('profiles')
            .update({
            next_payment_date: event.next_payment_date,
            last_payment_date: new Date().toISOString(),
        })
            .eq('id', userId);
    }
}
exports.PaddleService = PaddleService;
exports.paddleService = PaddleService.getInstance();
