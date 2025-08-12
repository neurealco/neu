"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaddleWebhook = exports.cancelSubscription = exports.getSubscriptionDetails = exports.getSubscriptionLink = void 0;
const paddle_service_1 = require("../services/paddle.service");
const supabase_service_1 = require("../services/supabase.service");
const getSubscriptionLink = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { plan } = req.params;
        // Obtener email del usuario
        const { data: profile, error } = await supabase_service_1.supabase
            .from('profiles')
            .select('email')
            .eq('id', req.user.id)
            .single();
        if (error || !profile || !profile.email) {
            throw new Error('User profile not found');
        }
        const url = await paddle_service_1.paddleService.generateSubscriptionLink(req.user.id, plan, profile.email);
        res.json({ url });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSubscriptionLink = getSubscriptionLink;
const getSubscriptionDetails = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { data: profile, error } = await supabase_service_1.supabase
            .from('profiles')
            .select('subscription_plan, paddle_update_url, paddle_cancel_url, next_payment_date')
            .eq('id', req.user.id)
            .single();
        if (error || !profile) {
            throw new Error('User profile not found');
        }
        res.json({
            plan: profile.subscription_plan,
            update_url: profile.paddle_update_url,
            cancel_url: profile.paddle_cancel_url,
            next_payment_date: profile.next_payment_date,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSubscriptionDetails = getSubscriptionDetails;
const cancelSubscription = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const { data: profile, error } = await supabase_service_1.supabase
            .from('profiles')
            .select('paddle_cancel_url')
            .eq('id', req.user.id)
            .single();
        if (error || !profile || !profile.paddle_cancel_url) {
            throw new Error('Subscription not found or already canceled');
        }
        res.json({
            message: 'Visit the following URL to cancel your subscription',
            url: profile.paddle_cancel_url
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.cancelSubscription = cancelSubscription;
const handlePaddleWebhook = async (req, res) => {
    try {
        const signature = req.headers['paddle-signature'];
        const payload = req.body;
        if (!paddle_service_1.paddleService.verifyWebhookSignature(payload, signature)) {
            return res.status(401).json({ error: "Invalid signature" });
        }
        await paddle_service_1.paddleService.handleWebhookEvent(payload);
        res.status(200).send('OK');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.handlePaddleWebhook = handlePaddleWebhook;
