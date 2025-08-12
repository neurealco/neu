import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { a as getUserCredits, $ as $$DashboardLayout } from '../../chunks/api_Kzg-DvNO.mjs';
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
  const credits = await getUserCredits(session.user.id);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Credits Balance", "data-astro-cid-pc6mwqj3": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="balance-container" data-astro-cid-pc6mwqj3> <div class="balance-card" data-astro-cid-pc6mwqj3> <h1 data-astro-cid-pc6mwqj3>Your Credits Balance</h1> <div class="balance-amount" data-astro-cid-pc6mwqj3>${credits.toLocaleString()}</div> <p class="balance-info" data-astro-cid-pc6mwqj3>
Use credits to access premium features and insights
</p> <div class="balance-actions" data-astro-cid-pc6mwqj3> <a href="/dashboard/surveys" class="btn" data-astro-cid-pc6mwqj3>Earn More Credits</a> <a href="/pricing" class="btn btn-outline" data-astro-cid-pc6mwqj3>Upgrade Plan</a> </div> </div> <div class="transactions" data-astro-cid-pc6mwqj3> <h2 data-astro-cid-pc6mwqj3>Recent Transactions</h2> <div class="transaction-list" data-astro-cid-pc6mwqj3> <div class="transaction-item" data-astro-cid-pc6mwqj3> <div class="transaction-info" data-astro-cid-pc6mwqj3> <div class="transaction-title" data-astro-cid-pc6mwqj3>Survey Completion</div> <div class="transaction-date" data-astro-cid-pc6mwqj3>Today, 14:32</div> </div> <div class="transaction-amount positive" data-astro-cid-pc6mwqj3>+1000</div> </div> <div class="transaction-item" data-astro-cid-pc6mwqj3> <div class="transaction-info" data-astro-cid-pc6mwqj3> <div class="transaction-title" data-astro-cid-pc6mwqj3>Stats Refresh</div> <div class="transaction-date" data-astro-cid-pc6mwqj3>Yesterday, 09:15</div> </div> <div class="transaction-amount negative" data-astro-cid-pc6mwqj3>-50</div> </div> <div class="transaction-item" data-astro-cid-pc6mwqj3> <div class="transaction-info" data-astro-cid-pc6mwqj3> <div class="transaction-title" data-astro-cid-pc6mwqj3>YouTube Analysis</div> <div class="transaction-date" data-astro-cid-pc6mwqj3>Jan 12, 2023</div> </div> <div class="transaction-amount negative" data-astro-cid-pc6mwqj3>-100</div> </div> </div> </div> </div> ` })} `;
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
