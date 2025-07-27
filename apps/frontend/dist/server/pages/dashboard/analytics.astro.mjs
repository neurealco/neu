import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as createAstro, d as renderComponent } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { f as fetchDashboardData, $ as $$DashboardLayout } from '../../chunks/api_DOQnm1yQ.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$AnalyticsChart = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="analytics-chart" data-astro-cid-acrkqft2> <h3 data-astro-cid-acrkqft2>Analytics Overview</h3> <div class="chart-placeholder" data-astro-cid-acrkqft2> <p data-astro-cid-acrkqft2>Interactive chart will be displayed here</p> </div> </div> `;
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
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Analytics", "data-astro-cid-pjrqo4c2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="analytics-header" data-astro-cid-pjrqo4c2> <h1 data-astro-cid-pjrqo4c2>Channel Analytics</h1> <div class="time-selector" data-astro-cid-pjrqo4c2> <select data-astro-cid-pjrqo4c2> <option data-astro-cid-pjrqo4c2>Last 7 days</option> <option data-astro-cid-pjrqo4c2>Last 30 days</option> <option data-astro-cid-pjrqo4c2>Last 90 days</option> </select> </div> </div> <div class="analytics-grid" data-astro-cid-pjrqo4c2> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Audience Overview</h2> ${renderComponent($$result2, "AnalyticsChart", $$AnalyticsChart, { "data-astro-cid-pjrqo4c2": true })} </div> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Engagement Metrics</h2> <div class="metrics-grid" data-astro-cid-pjrqo4c2> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>4.7%</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Engagement Rate</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>45%</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Watch Time</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>12.5K</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Comments</div> </div> <div class="metric" data-astro-cid-pjrqo4c2> <div class="metric-value" data-astro-cid-pjrqo4c2>8.2K</div> <div class="metric-label" data-astro-cid-pjrqo4c2>Shares</div> </div> </div> </div> <div class="analytics-card" data-astro-cid-pjrqo4c2> <h2 data-astro-cid-pjrqo4c2>Revenue Analytics</h2> <div class="revenue-stats" data-astro-cid-pjrqo4c2> <div class="revenue-item" data-astro-cid-pjrqo4c2> <div class="revenue-label" data-astro-cid-pjrqo4c2>Estimated Monthly Revenue</div> <div class="revenue-value" data-astro-cid-pjrqo4c2>$1,245.80</div> </div> <div class="revenue-item" data-astro-cid-pjrqo4c2> <div class="revenue-label" data-astro-cid-pjrqo4c2>CPM</div> <div class="revenue-value" data-astro-cid-pjrqo4c2>$3.42</div> </div> </div> </div> </div> ` })} `;
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
