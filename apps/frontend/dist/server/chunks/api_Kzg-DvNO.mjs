import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, e as renderHead, d as renderComponent, f as renderSlot } from './astro/server_LK4p-fTz.mjs';
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

const $$Astro$2 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { user } = Astro2.props;
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "\u{1F4CA}" },
    { name: "Analytics", href: "/dashboard/analytics", icon: "\u{1F4C8}" },
    { name: "Surveys", href: "/dashboard/surveys", icon: "\u{1F4DD}" },
    { name: "Balance", href: "/dashboard/balance", icon: "\u{1F4B0}" },
    { name: "Settings", href: "/dashboard/settings", icon: "\u2699\uFE0F" }
  ];
  return renderTemplate`${maybeRenderHead()}<aside class="sidebar" data-astro-cid-kw6cbdr6> <div class="user-info" data-astro-cid-kw6cbdr6> <div class="avatar" data-astro-cid-kw6cbdr6> <img${addAttribute(user.avatar || "/assets/images/default-avatar.png", "src")}${addAttribute(user.email, "alt")} width="80" height="80" data-astro-cid-kw6cbdr6> </div> <div class="user-details" data-astro-cid-kw6cbdr6> <h3 data-astro-cid-kw6cbdr6>${user.name || user.email.split("@")[0]}</h3> <p data-astro-cid-kw6cbdr6>${user.email}</p> </div> </div> <nav class="menu" data-astro-cid-kw6cbdr6> ${menuItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(Astro2.url.pathname === item.href ? "active" : "", "class")} data-astro-cid-kw6cbdr6> <span class="icon" data-astro-cid-kw6cbdr6>${item.icon}</span> <span class="name" data-astro-cid-kw6cbdr6>${item.name}</span> </a>`)} </nav> <div class="credits-display" data-astro-cid-kw6cbdr6> <div class="credits-label" data-astro-cid-kw6cbdr6>Available Credits</div> <div class="credits-value" data-astro-cid-kw6cbdr6>${user.credits?.toLocaleString() || "0"}</div> </div> </aside> `;
}, "/workspaces/neu/apps/frontend/src/components/dashboard/Sidebar.astro", void 0);

const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-qlfjksao> <div class="container" data-astro-cid-qlfjksao> <div class="header-inner" data-astro-cid-qlfjksao> <div class="logo" data-astro-cid-qlfjksao> <a href="/" data-astro-cid-qlfjksao> <img src="/assets/images/logo.png" alt="NeuReal" width="40" height="40" data-astro-cid-qlfjksao> <span data-astro-cid-qlfjksao>NeuReal</span> </a> </div> <nav class="nav" data-astro-cid-qlfjksao> ${navigation.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(Astro2.url.pathname === item.href ? "active" : "", "class")} data-astro-cid-qlfjksao> ${item.name} </a>`)} </nav> <div class="auth-buttons" data-astro-cid-qlfjksao> <a href="/login" class="btn btn-outline" data-astro-cid-qlfjksao>Login</a> </div> </div> </div> </header> `;
}, "/workspaces/neu/apps/frontend/src/components/layout/Header.astro", void 0);

const $$Astro = createAstro();
const $$DashboardLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const session = await getSession$1(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login?redirect=" + Astro2.url.pathname);
  }
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Dashboard - NeuReal</title><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="/styles/dashboard.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">${renderHead()}</head> <body data-astro-cid-kqx5um5x> ${renderComponent($$result, "Sidebar", $$Sidebar, { "user": session.user, "data-astro-cid-kqx5um5x": true })} <div class="main-content" data-astro-cid-kqx5um5x> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-kqx5um5x": true })} <main class="dashboard-main" data-astro-cid-kqx5um5x> <div class="container" data-astro-cid-kqx5um5x> ${renderSlot($$result, $$slots["default"])} </div> </main> <footer class="dashboard-footer" data-astro-cid-kqx5um5x> <div class="container" data-astro-cid-kqx5um5x> <p data-astro-cid-kqx5um5x>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} NeuReal. All rights reserved.</p> </div> </footer> </div> </body></html>`;
}, "/workspaces/neu/apps/frontend/src/layouts/DashboardLayout.astro", void 0);

const API_BASE_URL = undefined                                   ;

const getUserCredits = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/credits/balance?userId=${userId}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch credits");
    }
    const data = await response.json();
    return data.credits;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};
const getSurveyUrl = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/theorem/survey-url?userId=${userId}`, {
    credentials: "include"
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to get survey URL");
  }
  return response.text();
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

export { $$DashboardLayout as $, getUserCredits as a, getSurveyUrl as b, getSession as c, fetchDashboardData as f, getSession$1 as g };
