"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementUsage = exports.checkUsage = void 0;
const supabase_service_1 = require("./supabase.service");
// Definir estructura de límites con tipos fuertes
const PLAN_LIMITS = {
    free: {
        ai_chat: 10,
        youtube_refresh: 5
    },
    plus: {
        ai_chat: 1000,
        youtube_refresh: 100
    },
    pro: {
        ai_chat: 5000,
        youtube_refresh: 500
    }
};
const checkUsage = async (userId, feature) => {
    // Obtener plan del usuario
    const { data: user, error } = await supabase_service_1.supabase
        .from('profiles')
        .select('subscription_plan')
        .eq('id', userId)
        .single();
    if (error || !user)
        throw new Error('User not found');
    // Validar que el plan sea uno de los permitidos
    const plan = user.subscription_plan;
    const effectivePlan = ['free', 'plus', 'pro'].includes(plan) ? plan : 'free';
    const limit = PLAN_LIMITS[effectivePlan][feature];
    // Obtener mes actual
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStr = currentMonth.toISOString().split('T')[0];
    // Consultar uso existente
    const { data: usage } = await supabase_service_1.supabase
        .from('feature_usage')
        .select('usage_count')
        .eq('user_id', userId)
        .eq('feature', feature)
        .eq('month', monthStr)
        .single();
    const currentUsage = usage?.usage_count || 0;
    return { currentUsage, limit };
};
exports.checkUsage = checkUsage;
const incrementUsage = async (userId, feature) => {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStr = currentMonth.toISOString().split('T')[0];
    // Upsert: Insertar o actualizar contador
    const { error } = await supabase_service_1.supabase.rpc('upsert_feature_usage', {
        user_id: userId,
        feature,
        month: monthStr,
        increment: 1
    });
    if (error)
        throw new Error('Failed to increment usage: ' + error.message);
};
exports.incrementUsage = incrementUsage;
