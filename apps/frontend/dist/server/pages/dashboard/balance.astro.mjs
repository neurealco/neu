import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { g as getSession, a as getUsage, b as getSubscriptionDetails, $ as $$DashboardLayout } from '../../chunks/api_BWjvruJB.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Balance = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Balance;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  const usage = await getUsage(session.user.id);
  const subscription = await getSubscriptionDetails(session.user.id);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Usage & Subscription", "data-astro-cid-pc6mwqj3": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="balance-container" data-astro-cid-pc6mwqj3> <div class="subscription-card" data-astro-cid-pc6mwqj3> <h1 data-astro-cid-pc6mwqj3>Your Subscription Plan</h1> <div class="plan-name" data-astro-cid-pc6mwqj3>${subscription.plan.toUpperCase()}</div> <div class="plan-details" data-astro-cid-pc6mwqj3> <div class="detail" data-astro-cid-pc6mwqj3> <span data-astro-cid-pc6mwqj3>AI Chats:</span> <span data-astro-cid-pc6mwqj3>${subscription.limits.ai_chat} per month</span> </div> <div class="detail" data-astro-cid-pc6mwqj3> <span data-astro-cid-pc6mwqj3>Stats Refresh:</span> <span data-astro-cid-pc6mwqj3>${subscription.limits.youtube_refresh} per month</span> </div> <div class="detail" data-astro-cid-pc6mwqj3> <span data-astro-cid-pc6mwqj3>Status:</span> <span class="status-active" data-astro-cid-pc6mwqj3>Active</span> </div> </div> <div class="plan-actions" data-astro-cid-pc6mwqj3> <a href="/pricing" class="btn" data-astro-cid-pc6mwqj3>Upgrade Plan</a> <a href="/subscription" class="btn btn-outline" data-astro-cid-pc6mwqj3>Manage Subscription</a> </div> </div> <div class="usage-stats" data-astro-cid-pc6mwqj3> <h2 data-astro-cid-pc6mwqj3>Current Usage</h2> <div class="usage-item" data-astro-cid-pc6mwqj3> <div class="usage-info" data-astro-cid-pc6mwqj3> <div class="usage-title" data-astro-cid-pc6mwqj3>AI Assistant Chats</div> <div class="usage-date" data-astro-cid-pc6mwqj3>Current monthly usage</div> </div> <div class="usage-amount" data-astro-cid-pc6mwqj3> ${usage.ai_chat.current}/${usage.ai_chat.limit} </div> </div> <div class="usage-item" data-astro-cid-pc6mwqj3> <div class="usage-info" data-astro-cid-pc6mwqj3> <div class="usage-title" data-astro-cid-pc6mwqj3>Stats Refresh</div> <div class="usage-date" data-astro-cid-pc6mwqj3>Current monthly usage</div> </div> <div class="usage-amount" data-astro-cid-pc6mwqj3> ${usage.youtube_refresh.current}/${usage.youtube_refresh.limit} </div> </div> <div class="usage-item" data-astro-cid-pc6mwqj3> <div class="usage-info" data-astro-cid-pc6mwqj3> <div class="usage-title" data-astro-cid-pc6mwqj3>Next Reset</div> <div class="usage-date" data-astro-cid-pc6mwqj3>Usage cycle resets on</div> </div> <div class="usage-amount" data-astro-cid-pc6mwqj3> ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  })} </div> </div> </div> </div> ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/dashboard/balance.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/dashboard/balance.astro";
const $$url = "/dashboard/balance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Balance,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
