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
    get cancelSubscription () {
        return cancelSubscription;
    },
    get generateSubscriptionLink () {
        return generateSubscriptionLink;
    },
    get getSubscriptionDetails () {
        return getSubscriptionDetails;
    },
    get getSubscriptionLink () {
        return getSubscriptionLink;
    },
    get handlePaddleWebhook () {
        return handlePaddleWebhook;
    }
});
const _paddleservice = require("../services/paddle.service");
const _supabaseservice = require("../services/supabase.service");
const getSubscriptionLink = async (req, res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            });
        }
        const { plan } = req.params;
        // Obtener email del usuario de forma segura
        const { data: profile, error } = await _supabaseservice.supabase.from('profiles').select('email').eq('id', req.user.id).single();
        if (error || !profile || !profile.email) {
            throw new Error('User email not found');
        }
        const url = await _paddleservice.paddleService.generateSubscriptionLink(req.user.id, plan, profile.email // Usar email de la base de datos
        );
        res.json({
            url
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const generateSubscriptionLink = async (req, res)=>{
    try {
        if (!req.user) return res.status(401).json({
            error: "Unauthorized"
        });
        const { plan } = req.params;
        // Obtener email desde Supabase
        const { data: profile, error } = await _supabaseservice.supabase.from('profiles').select('email').eq('id', req.user.id).single();
        if (error || !profile || !profile.email) {
            throw new Error('User email not found');
        }
        const url = await _paddleservice.paddleService.generateSubscriptionLink(req.user.id, plan, profile.email);
        res.redirect(url);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const getSubscriptionDetails = async (req, res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            });
        }
        const { data: profile, error } = await _supabaseservice.supabase.from('profiles').select('subscription_plan, paddle_update_url, paddle_cancel_url, next_payment_date').eq('id', req.user.id).single();
        if (error || !profile) {
            throw new Error('User profile not found');
        }
        res.json({
            plan: profile.subscription_plan,
            update_url: profile.paddle_update_url,
            cancel_url: profile.paddle_cancel_url,
            next_payment_date: profile.next_payment_date
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const cancelSubscription = async (req, res)=>{
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            });
        }
        const { data: profile, error } = await _supabaseservice.supabase.from('profiles').select('paddle_cancel_url').eq('id', req.user.id).single();
        if (error || !profile || !profile.paddle_cancel_url) {
            throw new Error('Subscription not found or already canceled');
        }
        res.json({
            message: 'Visit the following URL to cancel your subscription',
            url: profile.paddle_cancel_url
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const handlePaddleWebhook = async (req, res)=>{
    try {
        const signature = req.headers['paddle-signature'];
        const payload = req.body;
        if (!_paddleservice.paddleService.verifyWebhookSignature(payload, signature)) {
            return res.status(401).json({
                error: "Invalid signature"
            });
        }
        await _paddleservice.paddleService.handleWebhookEvent(payload);
        res.status(200).send('OK');
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
