import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BbC40ioq.mjs';
import { manifest } from './manifest_CBCzgsfo.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/dashboard/ai-assistant.astro.mjs');
const _page2 = () => import('./pages/dashboard/analytics.astro.mjs');
const _page3 = () => import('./pages/dashboard/balance.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/documentation.astro.mjs');
const _page6 = () => import('./pages/features/_slug_.astro.mjs');
const _page7 = () => import('./pages/features.astro.mjs');
const _page8 = () => import('./pages/health.astro.mjs');
const _page9 = () => import('./pages/help/_slug_.astro.mjs');
const _page10 = () => import('./pages/help.astro.mjs');
const _page11 = () => import('./pages/login.astro.mjs');
const _page12 = () => import('./pages/payment-methods.astro.mjs');
const _page13 = () => import('./pages/pricing.astro.mjs');
const _page14 = () => import('./pages/privacy.astro.mjs');
const _page15 = () => import('./pages/security.astro.mjs');
const _page16 = () => import('./pages/social-media.astro.mjs');
const _page17 = () => import('./pages/terms-and-conditions.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["../../node_modules/.pnpm/astro@4.16.18_@types+node@24.0.13_rollup@4.45.1_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/dashboard/ai-assistant.astro", _page1],
    ["src/pages/dashboard/analytics.astro", _page2],
    ["src/pages/dashboard/balance.astro", _page3],
    ["src/pages/dashboard/index.astro", _page4],
    ["src/pages/documentation/index.astro", _page5],
    ["src/pages/features/[slug].astro", _page6],
    ["src/pages/features/index.astro", _page7],
    ["src/pages/health.ts", _page8],
    ["src/pages/help/[slug].astro", _page9],
    ["src/pages/help/index.astro", _page10],
    ["src/pages/login.astro", _page11],
    ["src/pages/payment-methods/index.astro", _page12],
    ["src/pages/pricing.astro", _page13],
    ["src/pages/privacy/index.astro", _page14],
    ["src/pages/security/index.astro", _page15],
    ["src/pages/social-media/index.astro", _page16],
    ["src/pages/terms-and-conditions/index.astro", _page17],
    ["src/pages/index.astro", _page18]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///workspaces/neu/apps/frontend/dist/client/",
    "server": "file:///workspaces/neu/apps/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
