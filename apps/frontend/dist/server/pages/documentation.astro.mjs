import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_LK4p-fTz.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_IhB8FdSg.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BtNhA7pc.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="documentation-container"> <section class="doc-intro"> <h1>Documentation</h1> <p>
Welcome to Neureal’s official documentation. Here you’ll find everything
        you need to start, grow, and succeed using the platform.
</p> </section> <section class="doc-section"> <h2>Getting Started</h2> <ol> <li>Make your account on the signup page.</li> <li>Verify your email.</li> <li>Connect your first social media profile.</li> </ol> </section> <section class="doc-section"> <h2>Core Features</h2> <table> <thead> <tr> <th>Feature</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Dashboard</td> <td>Monitor your channel insights with clarity.</td> </tr> <tr> <td>Trends</td> <td>Stay updated on what's going viral and comment on it.</td> </tr> <tr> <td>Community</td> <td>Discuss trends and ideas with other digital talents.</td> </tr> <tr> <td>Workspaces</td> <td>Learn how the algorithm works and structure your growth.</td> </tr> <tr> <td>AI Assistants</td> <td>Get access to 5 advancedAI assistants.</td> </tr> </tbody> </table> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/neu/apps/frontend/src/pages/documentation/index.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/documentation/index.astro";
const $$url = "/documentation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
