import { supabase } from './supabase.service';

// Definir tipos para planes y características
type SubscriptionPlan = 'free' | 'plus' | 'pro';
type Feature = 'ai_chat' | 'youtube_refresh';

// Definir estructura de límites con tipos fuertes
const PLAN_LIMITS: Record<SubscriptionPlan, Record<Feature, number>> = {
  free: {
    ai_chat: 100,
    youtube_refresh: 50
  },
  plus: {
    ai_chat: 1500,
    youtube_refresh: 1000
  },
  pro: {
    ai_chat: 5000,
    youtube_refresh: 1500
  }
};

export const checkUsage = async (userId: string, feature: Feature) => {
  try {
    // Obtener plan del usuario
    const { data: user, error } = await supabase
      .from('profiles')
      .select('subscription_plan')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new Error('User not found');
    }
    
    // Validar que el plan sea uno de los permitidos
    const plan = user.subscription_plan as string;
    const effectivePlan: SubscriptionPlan = 
      (plan === 'plus' || plan === 'pro') ? plan : 'free';
    
    const limit = PLAN_LIMITS[effectivePlan][feature];

    // Obtener mes actual
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStr = currentMonth.toISOString().split('T')[0];
    
    // Consultar uso existente
    const { data: usage } = await supabase
      .from('feature_usage')
      .select('usage_count')
      .eq('user_id', userId)
      .eq('feature', feature)
      .eq('month', monthStr)
      .single();

    const currentUsage = usage?.usage_count || 0;
    
    return { currentUsage, limit };
  } catch (error) {
    console.error('Error checking usage:', error);
    // En caso de error, devolver límites de free
    return { 
      currentUsage: 0, 
      limit: PLAN_LIMITS.free[feature] 
    };
  }
};

export const incrementUsage = async (userId: string, feature: Feature) => {
  try {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStr = currentMonth.toISOString().split('T')[0];
    
    // Upsert: Insertar o actualizar contador
    const { error } = await supabase.rpc('upsert_feature_usage', {
      user_id: userId,
      feature,
      month: monthStr,
      increment: 1
    });
    
    if (error) {
      throw new Error('Failed to increment usage: ' + error.message);
    }
  } catch (error) {
    console.error('Error incrementing usage:', error);
  }
};