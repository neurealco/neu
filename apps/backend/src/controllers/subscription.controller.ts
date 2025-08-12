import { Request, Response } from "express";
import { paddleService } from "../services/paddle.service";
import { supabase } from "../services/supabase.service";

export const getSubscriptionLink = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { plan } = req.params as { plan: 'plus' | 'pro' };
    
    // Obtener email del usuario
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', req.user.id)
      .single();

    if (error || !profile || !profile.email) {
      throw new Error('User profile not found');
    }

    const url = await paddleService.generateSubscriptionLink(
      req.user.id,
      plan,
      profile.email
    );

    res.json({ url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubscriptionDetails = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { data: profile, error } = await supabase
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { data: profile, error } = await supabase
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const handlePaddleWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['paddle-signature'] as string;
    const payload = req.body;

    if (!paddleService.verifyWebhookSignature(payload, signature)) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    await paddleService.handleWebhookEvent(payload);

    res.status(200).send('OK');
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};