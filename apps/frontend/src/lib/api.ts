export async function fetchDashboardData(userId: string) {
  try {
    const response = await fetch(`/api/dashboard?userId=${userId}`, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      credits: 0,
      youtube: {
        subscribers: 0,
        views_today: 0,
        estimated_revenue: 0,
        engagement_rate: 0,
      },
    };
  }
}

export async function refreshYouTubeStats() {
  try {
    const response = await fetch("/api/dashboard/refresh", {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to refresh stats:", error);
    return null;
  }
}

export async function getSurveyUrl(userId: string) {
  try {
    const response = await fetch(`/api/surveys/url?userId=${userId}`, {
      credentials: "include",
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Failed to get survey URL:", error);
    return "https://survey.theoremreach.com/error";
  }
}

export async function getUserCredits(userId: string) {
  try {
    const response = await fetch(`/api/user/credits?userId=${userId}`, {
      credentials: "include",
    });
    const data = await response.json();
    return data.credits || 0;
  } catch (error) {
    console.error("Failed to get user credits:", error);
    return 0;
  }
}

export async function getSession() {
  try {
    const response = await fetch("/api/auth/session", {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export async function signOut() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return true;
  } catch (error) {
    console.error("Failed to sign out:", error);
    return false;
  }
}
