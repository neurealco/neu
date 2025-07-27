import { g as decodeKey } from './chunks/astro/server_LK4p-fTz.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_JT-1I6hI.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/neu/apps/frontend/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/.pnpm/astro@4.16.18_@types+node@24.0.13_rollup@4.45.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/ai-assistant.fYR3mver.css"},{"type":"external","src":"/_astro/ai-assistant.Dm2DG6UN.css"}],"routeData":{"route":"/dashboard/ai-assistant","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/ai-assistant\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"ai-assistant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/ai-assistant.astro","pathname":"/dashboard/ai-assistant","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CGs-sSnw.css"},{"type":"external","src":"/_astro/ai-assistant.fYR3mver.css"}],"routeData":{"route":"/dashboard/analytics","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/analytics\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"analytics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/analytics.astro","pathname":"/dashboard/analytics","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/balance.BXxh4_cu.css"},{"type":"external","src":"/_astro/ai-assistant.fYR3mver.css"}],"routeData":{"route":"/dashboard/balance","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/balance\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"balance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/balance.astro","pathname":"/dashboard/balance","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/surveys.CQsusFIO.css"},{"type":"external","src":"/_astro/ai-assistant.fYR3mver.css"}],"routeData":{"route":"/dashboard/surveys","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/surveys\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"surveys","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/surveys.astro","pathname":"/dashboard/surveys","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kiQzyekc.js"}],"styles":[{"type":"external","src":"/_astro/index.DmJP3L86.css"},{"type":"external","src":"/_astro/ai-assistant.fYR3mver.css"}],"routeData":{"route":"/dashboard","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/index.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/documentation","isIndex":true,"type":"page","pattern":"^\\/documentation\\/?$","segments":[[{"content":"documentation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/documentation/index.astro","pathname":"/documentation","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CEhZ-_L-.css"},{"type":"external","src":"/_astro/_slug_.CjGbDYvR.css"}],"routeData":{"route":"/features/[slug]","isIndex":false,"type":"page","pattern":"^\\/features\\/([^/]+?)\\/?$","segments":[[{"content":"features","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/features/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/features","isIndex":true,"type":"page","pattern":"^\\/features\\/?$","segments":[[{"content":"features","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/features/index.astro","pathname":"/features","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CEhZ-_L-.css"},{"type":"external","src":"/_astro/_slug_.D7tkRt1z.css"}],"routeData":{"route":"/help/[slug]","isIndex":false,"type":"page","pattern":"^\\/help\\/([^/]+?)\\/?$","segments":[[{"content":"help","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/help/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BvRoZ9da.css"}],"routeData":{"route":"/help","isIndex":true,"type":"page","pattern":"^\\/help\\/?$","segments":[[{"content":"help","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/help/index.astro","pathname":"/help","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/login.CD75H2tG.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/payment-methods","isIndex":true,"type":"page","pattern":"^\\/payment-methods\\/?$","segments":[[{"content":"payment-methods","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/payment-methods/index.astro","pathname":"/payment-methods","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/pricing.D7aPhubX.css"}],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":true,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy/index.astro","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/security","isIndex":true,"type":"page","pattern":"^\\/security\\/?$","segments":[[{"content":"security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/security/index.astro","pathname":"/security","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/social-media","isIndex":true,"type":"page","pattern":"^\\/social-media\\/?$","segments":[[{"content":"social-media","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/social-media/index.astro","pathname":"/social-media","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms-and-conditions","isIndex":true,"type":"page","pattern":"^\\/terms-and-conditions\\/?$","segments":[[{"content":"terms-and-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-and-conditions/index.astro","pathname":"/terms-and-conditions","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/neu/apps/frontend/src/pages/features/[slug].astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/help/[slug].astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/dashboard/ai-assistant.astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/dashboard/analytics.astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/dashboard/balance.astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/dashboard/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/neu/apps/frontend/src/pages/dashboard/surveys.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:../../node_modules/.pnpm/astro@4.16.18_@types+node@24.0.13_rollup@4.45.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/dashboard/ai-assistant@_@astro":"pages/dashboard/ai-assistant.astro.mjs","\u0000@astro-page:src/pages/dashboard/analytics@_@astro":"pages/dashboard/analytics.astro.mjs","\u0000@astro-page:src/pages/dashboard/balance@_@astro":"pages/dashboard/balance.astro.mjs","\u0000@astro-page:src/pages/dashboard/surveys@_@astro":"pages/dashboard/surveys.astro.mjs","\u0000@astro-page:src/pages/dashboard/index@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/documentation/index@_@astro":"pages/documentation.astro.mjs","\u0000@astro-page:src/pages/features/[slug]@_@astro":"pages/features/_slug_.astro.mjs","\u0000@astro-page:src/pages/features/index@_@astro":"pages/features.astro.mjs","\u0000@astro-page:src/pages/help/[slug]@_@astro":"pages/help/_slug_.astro.mjs","\u0000@astro-page:src/pages/help/index@_@astro":"pages/help.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/payment-methods/index@_@astro":"pages/payment-methods.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/privacy/index@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/security/index@_@astro":"pages/security.astro.mjs","\u0000@astro-page:src/pages/social-media/index@_@astro":"pages/social-media.astro.mjs","\u0000@astro-page:src/pages/terms-and-conditions/index@_@astro":"pages/terms-and-conditions.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/workspaces/neu/node_modules/.pnpm/astro@4.16.18_@types+node@24.0.13_rollup@4.45.1_typescript@5.8.3/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CegeTp1R.mjs","/workspaces/neu/apps/frontend/src/components/AIAssistant.jsx":"_astro/AIAssistant.O57v3wxs.js","@astrojs/react/client.js":"_astro/client.B9dXWZ-G.js","/astro/hoisted.js?q=0":"_astro/hoisted.kiQzyekc.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.CjGbDYvR.css","/_astro/_slug_.CEhZ-_L-.css","/_astro/_slug_.D7tkRt1z.css","/_astro/ai-assistant.fYR3mver.css","/_astro/ai-assistant.Dm2DG6UN.css","/_astro/analytics.CGs-sSnw.css","/_astro/balance.BXxh4_cu.css","/_astro/index.DmJP3L86.css","/_astro/index.BvRoZ9da.css","/_astro/login.CD75H2tG.css","/_astro/pricing.D7aPhubX.css","/_astro/surveys.CQsusFIO.css","/robots.txt","/_astro/AIAssistant.O57v3wxs.js","/_astro/client.B9dXWZ-G.js","/_astro/hoisted.kiQzyekc.js","/_astro/index.CVf8TyFT.js","/assets/images/carsa.jpg","/assets/images/google.svg","/assets/images/img1.png","/assets/images/logo.svg","/assets/images/mh1.webp"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"4DTuXefQqaSM4Pqphn1PqYLcMaaSifr/8k0u5bGgdF0=","experimentalEnvGetSecretEnabled":false});

export { manifest };
