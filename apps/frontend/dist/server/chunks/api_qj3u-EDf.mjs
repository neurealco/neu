import { c as createComponent, a as createAstro, e as renderHead, d as renderComponent, f as renderSlot, r as renderTemplate } from './astro/server_LK4p-fTz.mjs';
import { $ as $$Header } from './Header_DeQcKpbd.mjs';
/* empty css                                */

{
  throw new Error("Missing Supabase environment variables");
}

async function getSession$1(request) {
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

const $$Astro = createAstro();
const $$DashboardLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const session = await getSession$1(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login?redirect=" + Astro2.url.pathname);
  }
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Dashboard - NeuReal</title><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="/styles/dashboard.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">${renderHead()}</head> <body data-astro-cid-kqx5um5x> <div class="main-content" data-astro-cid-kqx5um5x> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-kqx5um5x": true })} <main class="dashboard-main" data-astro-cid-kqx5um5x> <div class="container" data-astro-cid-kqx5um5x> ${renderSlot($$result, $$slots["default"])} </div> </main> <footer class="dashboard-footer" data-astro-cid-kqx5um5x> <div class="container" data-astro-cid-kqx5um5x> <p data-astro-cid-kqx5um5x>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} NeuReal. All rights reserved.</p> </div> </footer> </div> </body></html>`;
}, "/workspaces/neu/apps/frontend/src/layouts/DashboardLayout.astro", void 0);

const API_BASE_URL = undefined                                   ;

const getUsage = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/usage?userId=${userId}`, {
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Failed to fetch usage data");
  }
  return response.json();
};
const fetchDashboardData = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/dashboard?userId=${userId}`, {
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache"
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch dashboard data");
  }
  return response.json();
};
const getSession = async (request) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      headers: {
        "Cookie": request.headers.get("Cookie") || ""
      },
      credentials: "include"
    });
    if (!response.ok) return null;
    const sessionData = await response.json();
    return sessionData.user || null;
  } catch (error) {
    console.error("Session check failed:", error);
    return null;
  }
};

export { $$DashboardLayout as $, getUsage as a, getSession as b, fetchDashboardData as f, getSession$1 as g };
