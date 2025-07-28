import { c as createComponent, m as maybeRenderHead, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_LK4p-fTz.mjs';
import { $ as $$Layout } from '../chunks/Layout_C_J0oFDx.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$GoogleLoginButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="/api/auth/google" class="google-login-btn" data-astro-cid-xo255ldf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" data-astro-cid-xo255ldf> <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" data-astro-cid-xo255ldf></path> <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" data-astro-cid-xo255ldf></path> <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" data-astro-cid-xo255ldf></path> <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" data-astro-cid-xo255ldf></path> </svg>
Sign in with Google
</a> `;
}, "/workspaces/neu/apps/frontend/src/components/auth/GoogleLoginButton.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login to NeuReal", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="login-section" data-astro-cid-sgpqyurt> <div class="container" data-astro-cid-sgpqyurt> <div class="login-card" data-astro-cid-sgpqyurt> <h2 data-astro-cid-sgpqyurt>Login to Neureal</h2> <p data-astro-cid-sgpqyurt>Connect with your Google account to get started</p> <div class="login-methods" data-astro-cid-sgpqyurt> ${renderComponent($$result2, "GoogleLoginButton", $$GoogleLoginButton, { "data-astro-cid-sgpqyurt": true })} </div> <div class="login-footer" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>
By continuing, you agree to our <a href="#" data-astro-cid-sgpqyurt>Terms of Service</a> and
<a href="#" data-astro-cid-sgpqyurt>Privacy Policy</a> </p> </div> </div> </div> </section> ` })} `;
}, "/workspaces/neu/apps/frontend/src/pages/login.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
