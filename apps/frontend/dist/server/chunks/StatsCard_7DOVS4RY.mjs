import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_LK4p-fTz.mjs';
/* empty css                             */

const $$Astro = createAstro();
const $$StatsCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StatsCard;
  const { title, value, icon, usage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="stats-card" data-astro-cid-ekonfjnm> <div class="stats-icon" data-astro-cid-ekonfjnm>${icon}</div> <div class="stats-content" data-astro-cid-ekonfjnm> <h3 data-astro-cid-ekonfjnm>${title}</h3> <div class="stats-value-container" data-astro-cid-ekonfjnm> <p class="stats-value" data-astro-cid-ekonfjnm>${value}</p> ${usage && renderTemplate`<div class="usage-progress" data-astro-cid-ekonfjnm> <div class="progress-bar"${addAttribute(`width: ${Math.min(100, usage.current / usage.limit * 100)}%`, "style")} data-astro-cid-ekonfjnm></div> <span class="usage-text" data-astro-cid-ekonfjnm>${usage.current}/${usage.limit}</span> </div>`} </div> </div> </div> `;
}, "/workspaces/neu/apps/frontend/src/components/dashboard/StatsCard.astro", void 0);

export { $$StatsCard as $ };
