import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as createAstro, d as renderComponent } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { g as getSession, f as fetchDashboardData, a as getUsage, $ as $$DashboardLayout } from '../../chunks/api_BWjvruJB.mjs';
/* empty css                                        */
import { $ as $$StatsCard } from '../../chunks/StatsCard_7DOVS4RY.mjs';
export { renderers } from '../../renderers.mjs';

const $$AnalyticsChart = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="analytics-chart" data-astro-cid-acrkqft2> <h3 data-astro-cid-acrkqft2>Audience Growth</h3> <div class="chart-container" data-astro-cid-acrkqft2> <div class="chart-header" data-astro-cid-acrkqft2> <div class="chart-legend" data-astro-cid-acrkqft2> <div class="legend-item" data-astro-cid-acrkqft2> <span class="color-dot" style="background-color: var(--primary)" data-astro-cid-acrkqft2></span> <span data-astro-cid-acrkqft2>Subscribers</span> </div> <div class="legend-item" data-astro-cid-acrkqft2> <span class="color-dot" style="background-color: var(--success)" data-astro-cid-acrkqft2></span> <span data-astro-cid-acrkqft2>Views</span> </div> </div> <div class="chart-actions" data-astro-cid-acrkqft2> <button class="btn-icon" data-astro-cid-acrkqft2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-acrkqft2> <circle cx="12" cy="12" r="1" data-astro-cid-acrkqft2></circle> <circle cx="12" cy="5" r="1" data-astro-cid-acrkqft2></circle> <circle cx="12" cy="19" r="1" data-astro-cid-acrkqft2></circle> </svg> </button> </div> </div> <div class="chart-placeholder" data-astro-cid-acrkqft2> <div class="chart-grid" data-astro-cid-acrkqft2> <div class="grid-line" data-astro-cid-acrkqft2></div> <div class="grid-line" data-astro-cid-acrkqft2></div> <div class="grid-line" data-astro-cid-acrkqft2></div> <div class="grid-line" data-astro-cid-acrkqft2></div> <div class="grid-line" data-astro-cid-acrkqft2></div> </div> <div class="chart-data" data-astro-cid-acrkqft2> <div class="data-bar" style="height: 60%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 80%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 45%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 75%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 65%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 90%" data-astro-cid-acrkqft2></div> <div class="data-bar" style="height: 50%" data-astro-cid-acrkqft2></div> </div> <div class="chart-labels" data-astro-cid-acrkqft2> <span data-astro-cid-acrkqft2>Mon</span> <span data-astro-cid-acrkqft2>Tue</span> <span data-astro-cid-acrkqft2>Wed</span> <span data-astro-cid-acrkqft2>Thu</span> <span data-astro-cid-acrkqft2>Fri</span> <span data-astro-cid-acrkqft2>Sat</span> <span data-astro-cid-acrkqft2>Sun</span> </div> </div> </div> </div> `;
}, "/workspaces/neu/apps/frontend/src/components/dashboard/AnalyticsChart.astro", void 0);

const $$Astro = createAstro();
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Analytics;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  await fetchDashboardData(session.user.id);
  const usage = await getUsage(session.user.id);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Analytics", "data-astro-cid-pjrqo4c2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="analytics-header" data-astro-cid-pjrqo4c2> <h1 data-astro-cid-pjrqo4c2>Channel Analytics</h1> <div class="time-selector" data-astro-cid-pjrqo4c2> <select data-astro-cid-pjrqo4c2> <option data-astro-cid-pjrqo4c2>Last 7 days</option> <option data-astro-cid-pjrqo4c2>Last 30 days</option> <option data-astro-cid-pjrqo4c2>Last 90 days</option> </select> </div> </div> <div class="analytics-grid" data-astro-cid-pjrqo4c2> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Audience Overview</h2> ${renderComponent($$result2, "AnalyticsChartComponent", $$AnalyticsChart, { "data-astro-cid-pjrqo4c2": true })} </div> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Engagement Metrics</h2> <div class="metrics-grid" data-astro-cid-pjrqo4c2> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>4.7%</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Engagement Rate</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>45%</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Watch Time</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>12.5K</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Comments</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>8.2K</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Shares</div> </div> </div> </div> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Revenue Analytics</h2> <div class="revenue-stats" data-astro-cid-pjrqo4c2> <div class="revenue-item" data-astro-cid-pjrqo4c2> <div class="revenue-label" data-astro-cid-pjrqo4c2>Estimated Monthly Revenue</div> <div class="revenue-value" data-astro-cid-pjrqo4c2>$1,245.80</div> </div> <div class="revenue-item" data-astro-cid-pjrqo4c2> <div class="revenue-label" data-astro-cid-pjrqo4c2>CPM</div> <div class="revenue-value" data-astro-cid-pjrqo4c2>$3.42</div> </div> </div> </div> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Feature Usage</h2> <div class="metrics-grid" data-astro-cid-pjrqo4c2> ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "AI Chats", "value": usage.ai_chat.current, "icon": "\u{1F4AC}", "usage": usage.ai_chat, "data-astro-cid-pjrqo4c2": true })} ${renderComponent($$result2, "StatsCard", $$StatsCard, { "title": "Stats Refresh", "value": usage.youtube_refresh.current, "icon": "\u{1F504}", "usage": usage.youtube_refresh, "data-astro-cid-pjrqo4c2": true })} </div> </div> </div> ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/dashboard/analytics.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/dashboard/analytics.astro";
const $$url = "/dashboard/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
