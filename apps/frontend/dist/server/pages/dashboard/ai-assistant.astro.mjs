import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { g as getSession, a as getUserCredits, $ as $$DashboardLayout } from '../../chunks/api_Kzg-DvNO.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$AiAssistant = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AiAssistant;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  const credits = await getUserCredits(session.user.id);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "AI Assistant", "data-astro-cid-6gjp5hge": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AIAssistant", null, { "client:only": "react", "initialCredits": credits, "client:component-hydration": "only", "data-astro-cid-6gjp5hge": true, "client:component-path": "/workspaces/neu/apps/frontend/src/components/AIAssistant.jsx", "client:component-export": "default" })} ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/dashboard/ai-assistant.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/dashboard/ai-assistant.astro";
const $$url = "/dashboard/ai-assistant";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AiAssistant,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
