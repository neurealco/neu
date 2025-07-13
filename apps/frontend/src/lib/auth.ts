import { supabase } from "./supabaseClient";

export async function getSession(request: Request) {
  // Check for session cookie
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;

  try {
    const sessionResponse = await fetch(
      `${import.meta.env.PUBLIC_SITE_URL}/api/auth/session`,
      {
        headers: { cookie },
      }
    );

    if (!sessionResponse.ok) return null;

    const sessionData = await sessionResponse.json();
    return sessionData.isAuthenticated ? sessionData : null;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export async function signOut() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  // Redirect to home
  window.location.href = "/";
}
