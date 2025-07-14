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

  interface TheoremReachWebhook {
    user_id: string;
    amount: number;
    survey_id: string;
    status: "completed" | "terminated";
  }
}
