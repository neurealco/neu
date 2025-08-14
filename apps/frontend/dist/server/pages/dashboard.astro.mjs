import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_LK4p-fTz.mjs';
import { a as getSession, f as fetchDashboardData, $ as $$DashboardLayout } from '../chunks/api_Cphik_UR.mjs';
import { $ as $$StatsCard } from '../chunks/StatsCard_7DOVS4RY.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$YouTubeStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$YouTubeStats;
  const { stats } = Astro2.props;
  const maxValue = Math.max(...stats.daily_data.map((d) => d.new_subscribers));
  const minValue = Math.min(...stats.daily_data.map((d) => d.new_subscribers));
  return renderTemplate`${maybeRenderHead()}<div class="youtube-stats" data-astro-cid-jxdx4ion> <div class="stats-header" data-astro-cid-jxdx4ion> <h2 data-astro-cid-jxdx4ion>Subscriber Growth</h2> <div class="stats-summary" data-astro-cid-jxdx4ion> <div class="stat-item" data-astro-cid-jxdx4ion> <span class="stat-value" data-astro-cid-jxdx4ion>${stats.subscribers.toLocaleString()}</span> <span class="stat-label" data-astro-cid-jxdx4ion>Total</span> </div> <div class="stat-item" data-astro-cid-jxdx4ion> <span class="stat-value" data-astro-cid-jxdx4ion>+${stats.daily_data.reduce(
    (acc, day) => acc + parseInt(day.new_subscribers),
    0
  )}</span> <span class="stat-label" data-astro-cid-jxdx4ion>Last 7 days</span> </div> </div> </div> <div class="chart-container" data-astro-cid-jxdx4ion> <div class="chart-bars" data-astro-cid-jxdx4ion> ${stats.daily_data.map((data) => {
    const height = (data.new_subscribers - minValue) / (maxValue - minValue) * 80;
    return renderTemplate`<div class="chart-bar"${addAttribute(`height: ${height}%`, "style")}${addAttribute(data.new_subscribers.toLocaleString(), "data-value")} data-astro-cid-jxdx4ion> <span class="bar-label" data-astro-cid-jxdx4ion> ${new Date(data.date).toLocaleDateString("en-US", {
      weekday: "short"
    })} </span> </div>`;
  })} </div> </div> </div> `;
}, "/workspaces/neu/apps/frontend/src/components/dashboard/YouTubeStats.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  let dashboardData;
  try {
    dashboardData = await fetchDashboardData(session.user.id);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    dashboardData = {
      youtube: {
        subscribers: "0",
        views_today: "0",
        estimated_revenue: "0.00",
        engagement_rate: "0.0",
        daily_data: []
      }
    };
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Dashboard", "data-astro-cid-y55gmoyq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard-header" data-astro-cid-y55gmoyq> <h1 data-astro-cid-y55gmoyq>Dashboard</h1> <button class="btn" id="refresh-stats" data-astro-cid-y55gmoyq>Refresh Stats (50 Credits)</button> </div> <div class="stats-grid" data-astro-cid-y55gmoyq> ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Subscribers", "value": dashboardData.youtube.subscribers.toLocaleString(), "icon": "\u{1F465}", "data-astro-cid-y55gmoyq": true })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Views Today", "value": dashboardData.youtube.views_today.toLocaleString(), "icon": "\u{1F440}", "data-astro-cid-y55gmoyq": true })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Estimated Revenue", "value": `$${parseFloat(dashboardData.youtube.estimated_revenue).toFixed(2)}`, "icon": "\u{1F4B5}", "data-astro-cid-y55gmoyq": true })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Engagement Rate", "value": `${dashboardData.youtube.engagement_rate}%`, "icon": "\u{1F525}", "data-astro-cid-y55gmoyq": true })} </div> ${renderComponent($$result2, "YouTubeStats", $$YouTubeStats, { "stats": dashboardData.youtube, "data-astro-cid-y55gmoyq": true })} ` })}  `;
}, "/workspaces/neu/apps/frontend/src/pages/dashboard/index.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
