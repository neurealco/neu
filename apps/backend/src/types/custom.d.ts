import { User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }

  interface YouTubeChannel {
    id: string;
    title: string;
    thumbnail: string;
    subscribers: string;
    views: string;
    videos: string;
  }

  interface YouTubeStats {
    channelId: string;
    channelTitle: string;
    thumbnail: string;
    subscribers: string;
    views: string;
    videos: string;
    dailyStats: Array<{
      date: string;
      views: string;
      minutesWatched: string;
      newSubscribers: string;
    }>;
  }

  interface SubscriptionDetails {
    plan: string;
    update_url?: string;
    cancel_url?: string;
    next_payment_date?: string;
  }
}