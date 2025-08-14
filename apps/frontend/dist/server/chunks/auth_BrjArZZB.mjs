{
  throw new Error("Missing Supabase environment variables");
}

async function getSession(request) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  try {
    const sessionResponse = await fetch(
      `${undefined                               }/api/auth/session`,
      {
        headers: { cookie }
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

export { getSession as g };
