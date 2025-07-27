import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_LK4p-fTz.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_IhB8FdSg.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BtNhA7pc.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Our Social Networks" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="social-container"> <div class="social-header"> <h1 class="social-main-title">Connect With Us</h1> <p class="social-subtitle">Follow our latest updates and content</p> </div> <div class="social-grid"> <!-- YouTube Card --> <article class="social-card youtube"> <div class="card-content"> <div class="platform-icon-container"> <svg class="platform-icon" width="48" height="48" viewBox="0 0 24 24" aria-label="YouTube logo"> <path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"></path> </svg> </div> <h2 class="platform-title">YouTube</h2> <p class="platform-handle">@neurealco</p> <div class="card-actions"> <a href="https://www.youtube.com/@neurealco" target="_blank" rel="noopener noreferrer" class="social-link youtube-link">
Visit Channel
<span class="external-arrow">→</span> </a> </div> </div> </article> <!-- Instagram Card --> <article class="social-card instagram"> <div class="card-content"> <div class="platform-icon-container"> <svg class="platform-icon" width="48" height="48" viewBox="0 0 24 24" aria-label="Instagram logo"> <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z"></path> </svg> </div> <h2 class="platform-title">Instagram</h2> <p class="platform-handle">@neurealco</p> <div class="card-actions"> <a href="NOT_FOUND" target="_blank" rel="noopener noreferrer" class="social-link instagram-link">
Follow Us
<span class="external-arrow">→</span> </a> </div> </div> </article> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/neu/apps/frontend/src/pages/social-media/index.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/social-media/index.astro";
const $$url = "/social-media";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
