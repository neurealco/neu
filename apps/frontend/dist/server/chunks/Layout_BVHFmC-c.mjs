import { c as createComponent, a as createAstro, r as renderTemplate, f as renderSlot, e as renderHead } from './astro/server_LK4p-fTz.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Neureal" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description" content="Grow on Social Media with advanced tools like AI, trends and more and with a community of Influencers."><meta name="author" content="Neureal"><meta property="og:image" content="/favicon.ico"><link rel="icon" type="image/png" href="/favicon.ico"><meta property="og:image" content="/favicon.ico"><!-- Nuevas etiquetas de favicon --><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"><meta name="msapplication-TileColor" content="#da532c"><meta name="theme-color" content="#000000"><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet" crossorigin><!-- Enlaza los estilos principales --><link rel="stylesheet" href="/styles/main.css"><link rel="stylesheet" href="/styles/footer.css"><link rel="stylesheet" href="/styles/login.css"><link rel="stylesheet" href="/styles/bta.css"><link rel="stylesheet" href="/styles/help-center.css"><link rel="stylesheet" href="/styles/documentation.css"><link rel="stylesheet" href="/styles/sm.css"><link rel="stylesheet" href="/styles/pm.css"><link rel="stylesheet" href="/styles/terms.css"><link rel="stylesheet" href="/styles/privacy.css"><link rel="stylesheet" href="/styles/security.css">', "</head> <body> ", ' <!-- Scripts frontend (deben estar en /public/scripts/client/) --> <script src="/scripts/client/scripts.js" type="module" defer><\/script> <script src="/scripts/client/waves.js" type="module" defer><\/script> <script src="/scripts/client/faq.js" type="module" defer><\/script> <script src="/scripts/client/header.js" type="module" defer><\/script> <script src="/scripts/client/scr.js" type="module" defer><\/script> </body> </html>'])), title, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/workspaces/neu/apps/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
