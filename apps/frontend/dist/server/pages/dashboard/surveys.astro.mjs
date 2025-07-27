import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderComponent } from '../../chunks/astro/server_LK4p-fTz.mjs';
import { b as getSurveyUrl, $ as $$DashboardLayout } from '../../chunks/api_DOQnm1yQ.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$SurveyIframe = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SurveyIframe;
  const { url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<iframe${addAttribute(url, "src")} class="survey-iframe" title="Surveys" data-astro-cid-rll4c2lb></iframe> `;
}, "/workspaces/neu/apps/frontend/src/components/surveys/SurveyIframe.astro", void 0);

const $$Astro = createAstro();
const $$Surveys = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Surveys;
  const session = await getSession(Astro2.request);
  if (!session) {
    return Astro2.redirect("/login");
  }
  const surveyUrl = await getSurveyUrl(session.user.id);
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Earn Credits", "data-astro-cid-n7sqkczo": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="surveys-container" data-astro-cid-n7sqkczo> <div class="surveys-header" data-astro-cid-n7sqkczo> <h1 data-astro-cid-n7sqkczo>Earn Credits</h1> <p data-astro-cid-n7sqkczo>Complete surveys to earn credits for premium features</p> </div> <div class="survey-frame" data-astro-cid-n7sqkczo> ${renderComponent($$result2, "SurveyIframe", $$SurveyIframe, { "url": surveyUrl, "data-astro-cid-n7sqkczo": true })} </div> <div class="credits-info" data-astro-cid-n7sqkczo> <h2 data-astro-cid-n7sqkczo>How it works</h2> <ul data-astro-cid-n7sqkczo> <li data-astro-cid-n7sqkczo>Complete surveys to earn credits</li> <li data-astro-cid-n7sqkczo>1000 Theorem Reach points = 1000 NeuReal credits</li> <li data-astro-cid-n7sqkczo>Credits are added instantly after survey completion</li> <li data-astro-cid-n7sqkczo>Use credits to unlock premium features</li> </ul> </div> </div> ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/dashboard/surveys.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/dashboard/surveys.astro";
const $$url = "/dashboard/surveys";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Surveys,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
