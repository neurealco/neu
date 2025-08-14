import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_LK4p-fTz.mjs';
import { $ as $$Layout } from '../chunks/Layout_BVHFmC-c.mjs';
import { g as getSession } from '../chunks/auth_BrjArZZB.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Pricing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pricing;
  const session = await getSession(Astro2.request);
  const currentPlan = session?.user?.subscription_plan || "free";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pricing", "data-astro-cid-lmkygsfs": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pricing-container" data-astro-cid-lmkygsfs> <div class="pricing-header" data-astro-cid-lmkygsfs> <h1 data-astro-cid-lmkygsfs>Choose Your Plan</h1> <p data-astro-cid-lmkygsfs>Simple, transparent pricing with no hidden fees</p> </div> <div class="plans" data-astro-cid-lmkygsfs> <!-- Free Plan --> <div${addAttribute(`plan-card ${currentPlan === "free" ? "current-plan" : ""}`, "class")} data-astro-cid-lmkygsfs> <div class="plan-header" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>Free</h2> <div class="price" data-astro-cid-lmkygsfs>$0<span data-astro-cid-lmkygsfs>/month</span></div> </div> <ul class="features" data-astro-cid-lmkygsfs> <li data-astro-cid-lmkygsfs>Basic YouTube Analytics</li> <li data-astro-cid-lmkygsfs>100 AI Chats</li> <li data-astro-cid-lmkygsfs>50 Stats Refresh</li> <li data-astro-cid-lmkygsfs>2 Video Optimizations</li> <li data-astro-cid-lmkygsfs>Email Support</li> </ul> ${currentPlan === "free" ? renderTemplate`<button class="btn current" data-astro-cid-lmkygsfs>Your Current Plan</button>` : renderTemplate`<a href="/dashboard" class="btn" data-astro-cid-lmkygsfs>Get Started</a>`} </div> <!-- Plus Plan --> <div${addAttribute(`plan-card highlight ${currentPlan === "plus" ? "current-plan" : ""}`, "class")} data-astro-cid-lmkygsfs> <div class="popular-badge" data-astro-cid-lmkygsfs>Recommended</div> <div class="plan-header" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>Plus</h2> <div class="price" data-astro-cid-lmkygsfs>$15<span data-astro-cid-lmkygsfs>/month</span></div> </div> <ul class="features" data-astro-cid-lmkygsfs> <li data-astro-cid-lmkygsfs>Advanced Analytics</li> <li data-astro-cid-lmkygsfs>1,500 AI Chats</li> <li data-astro-cid-lmkygsfs>1,000 Stats Refresh</li> <li data-astro-cid-lmkygsfs>50 Video Optimizations</li> <li data-astro-cid-lmkygsfs>Priority Support</li> <li data-astro-cid-lmkygsfs>Custom Reports</li> </ul> <a${addAttribute(session ? `/api/subscription/plus` : "/sign-in", "href")} class="btn primary" data-astro-cid-lmkygsfs> ${currentPlan === "plus" ? "Manage Plan" : "Get Plus"} </a> </div> <!-- Pro Plan --> <div${addAttribute(`plan-card ${currentPlan === "pro" ? "current-plan" : ""}`, "class")} data-astro-cid-lmkygsfs> <div class="plan-header" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>Pro</h2> <div class="price" data-astro-cid-lmkygsfs>$50<span data-astro-cid-lmkygsfs>/month</span></div> </div> <ul class="features" data-astro-cid-lmkygsfs> <li data-astro-cid-lmkygsfs>All Plus Features</li> <li data-astro-cid-lmkygsfs>5,000 AI Chats</li> <li data-astro-cid-lmkygsfs>1,500 Stats Refresh</li> <li data-astro-cid-lmkygsfs>250 Video Optimizations</li> <li data-astro-cid-lmkygsfs>24/7 Dedicated Support</li> <li data-astro-cid-lmkygsfs>AI Content Suggestions</li> <li data-astro-cid-lmkygsfs>Competitor Analysis</li> </ul> <a${addAttribute(session ? `/api/subscription/pro` : "/sign-in", "href")} class="btn primary" data-astro-cid-lmkygsfs> ${currentPlan === "pro" ? "Manage Plan" : "Get Pro"} </a> </div> </div> <div class="faq" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>Frequently Asked Questions</h2> <div class="faq-item" data-astro-cid-lmkygsfs> <h3 data-astro-cid-lmkygsfs>Can I change plans later?</h3> <p data-astro-cid-lmkygsfs>Yes, you can upgrade or downgrade your plan anytime.</p> </div> <div class="faq-item" data-astro-cid-lmkygsfs> <h3 data-astro-cid-lmkygsfs>Is there a free trial?</h3> <p data-astro-cid-lmkygsfs>All paid plans come with a 14-day free trial with full features.</p> </div> <div class="faq-item" data-astro-cid-lmkygsfs> <h3 data-astro-cid-lmkygsfs>How do I cancel my subscription?</h3> <p data-astro-cid-lmkygsfs>You can cancel anytime from your account settings.</p> </div> </div> </div> ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/pricing.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
