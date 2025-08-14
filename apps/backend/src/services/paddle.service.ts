import axios from 'axios';
import config from '../config';
import { supabase } from './supabase.service';
import logger from '../utils/logger.util';
import crypto from 'crypto';

interface PaddleSubscription {
  id: string;
  plan_id: string;
  user_id: string;
  status: 'active' | 'past_due' | 'paused' | 'deleted';
  next_payment_date: string;
  update_url: string;
  cancel_url: string;
}

export class PaddleService {
  private static instance: PaddleService;

  private constructor() {}

  public static getInstance(): PaddleService {
    if (!PaddleService.instance) {
      PaddleService.instance = new PaddleService();
    }
    return PaddleService.instance;
  }

  /**
   * Genera un enlace de checkout para suscripción
   */
  async generateSubscriptionLink(
    userId: string,
    plan: 'plus' | 'pro',
    email: string
  ): Promise<string> {
    try {
      // Obtener IDs de planes desde la configuración
      const plusPlanId = config.PADDLE_PLUS_PLAN_ID;
      const proPlanId = config.PADDLE_PRO_PLAN_ID;
      
      if (!plusPlanId || !proPlanId) {
        throw new Error('Paddle plan IDs are not configured');
      }

      const planId = plan === 'plus' ? plusPlanId : proPlanId;

      const response = await axios.post(
        `${config.PADDLE_CHECKOUT_URL}/api/2.0/product/generate_pay_link`,
        {
          vendor_id: config.PADDLE_VENDOR_ID,
          vendor_auth_code: config.PADDLE_API_KEY,
          product_id: planId,
          customer_email: email,
          passthrough: JSON.stringify({ userId }),
          return_url: `${config.SITE_URL}/dashboard?success=true`,
        }
      );

      if (response.data.success) {
        return response.data.response.url;
      }

      throw new Error('Failed to generate subscription link');
    } catch (error) {
      logger.error('Paddle subscription link error', error);
      throw new Error('Failed to generate subscription link');
    }
  }

  /**
   * Verifica la firma de los webhooks de Paddle
   */
  verifyWebhookSignature(payload: any, signature: string): boolean {
    const publicKey = config.PADDLE_PUBLIC_KEY;
    if (!publicKey) {
      logger.error('Paddle public key is not configured');
      return false;
    }

    try {
      const verifier = crypto.createVerify('sha1');
      verifier.update(JSON.stringify(payload));
      
      return verifier.verify(
        `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
        signature,
        'base64'
      );
    } catch (error) {
      logger.error('Paddle signature verification error', error);
      return false;
    }
  }

  /**
   * Procesa eventos de webhook de Paddle
   */
  async handleWebhookEvent(event: any): Promise<void> {
    if (!event.alert_name) return;

    try {
      // Extraer userId del passthrough o del customer_user_id
      let userId = event.passthrough?.userId || event.customer_user_id;
      if (!userId) {
        logger.warn('Paddle webhook event without user ID', event);
        return;
      }

      // Obtener IDs de planes desde la configuración
      const plusPlanId = config.PADDLE_PLUS_PLAN_ID;
      const proPlanId = config.PADDLE_PRO_PLAN_ID;
      
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
    } catch (error) {
      logger.error('Paddle webhook processing error', error);
    }
  }

  private async updateUserSubscription(
    userId: string, 
    event: any,
    plusPlanId: string,
    proPlanId: string
  ): Promise<void> {
    // Determinar el plan basado en el ID del plan de suscripción
    const plan = event.subscription_plan_id === plusPlanId
      ? 'plus'
      : event.subscription_plan_id === proPlanId
        ? 'pro'
        : 'free';

    await supabase
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

  private async downgradeToFree(userId: string): Promise<void> {
    await supabase
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

  private async updatePaymentStatus(userId: string, event: any): Promise<void> {
    await supabase
      .from('profiles')
      .update({
        next_payment_date: event.next_payment_date,
        last_payment_date: new Date().toISOString(),
      })
      .eq('id', userId);
  }
}

export const paddleService = PaddleService.getInstance();