import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_LK4p-fTz.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_IhB8FdSg.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_BtNhA7pc.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="terms-container"> <h1 class="terms-title">Terms and Conditions</h1> <div class="section"> <h2 class="section-title">1. Introduction</h2> <p>
Welcome to Neureal. By accessing and using our website and services, you
        confirm that you have read, understood, and agreed to comply with the
        following terms and conditions. If you do not accept these terms, you
        should discontinue the use of our platform immediately.
</p> </div> <div class="section"> <h2 class="section-title">2. Seller Information</h2> <p>
Neureal is an independent platform operated by a freelancer. All
        transactions on this site are securely processed through <strong>Paddle</strong>. Neureal does not store or manage payment details, ensuring a secure
        transaction process for our users.
</p> <p class="notice">
Important: Payment disputes must be handled directly with Paddle's
        customer support (<a href="https://www.paddle.com">paddle.com</a>)
</p> </div> <div class="section"> <h2 class="section-title">3. Products and Services</h2> <p>
Neureal exclusively provides access to digital products in the form of
        private workspaces pages containing valuable content. Product
        availability, descriptions, and functionalities may be updated or
        modified at any time without prior notice to enhance the user
        experience.
</p> </div> <div class="section"> <h2 class="section-title">4. Payments and Security</h2> <p>
All payments are securely processed through Paddle. Neureal is not
        responsible for payment processing issues, including but not limited to
        delays, failed transactions, or technical errors.
</p> <ul> <li>Transactions handled exclusively by Paddle</li> <li>No payment data stored on our servers</li> <li>Chargeback disputes must go through payment processor</li> </ul> </div> <div class="section"> <h2 class="section-title">5. Product Delivery</h2> <ul> <li> <strong>Digital Products:</strong> Access granted via private Notion page
          after payment confirmation
</li> <li> <strong>Access Responsibility:</strong> Personal and non-transferable access
          credentials
</li> </ul> </div> <div class="section"> <h2 class="section-title">6. Refund Policy</h2> <p>
All sales are final due to the digital nature of products. Refunds only
        considered when required by applicable law or processor policies.
</p> <p class="notice">
No refunds will be processed for unauthorized sharing of access
        credentials.
</p> </div> <div class="section"> <h2 class="section-title">7. Use of the Site</h2> <p>
Unauthorized reproduction of any content, design elements, or
        functionality will result in immediate access revocation and legal
        action. All usage is monitored and logged.
</p> </div> <div class="section"> <h2 class="section-title">8. Limitation of Liability</h2> <ul> <li>Services provided "as is" without uptime guarantees</li> <li>Third-party hosting services may experience downtime</li> <li>Users responsible for accurate payment information</li> </ul> </div> <div class="section"> <h2 class="section-title">9. Modifications</h2> <p>
We reserve the right to update these terms at any time without prior
        notice. Continued use constitutes acceptance of modifications.
</p> </div> <div class="section"> <h2 class="section-title">10. Contact</h2> <ul> <li> <strong>General Inquiries:</strong> <a href="mailto:neurealchat@gmail.com">neurealchat@gmail.com</a> </li> <li> <strong>Payment Support:</strong> Paddle <a href="https://www.paddle.com/help">help center</a> </li> </ul> </div> <div class="section"> <h2 class="section-title">11. Data Retention</h2> <p>
Access maintained indefinitely. Session credentials expire after 90 days
        of inactivity, requiring renewal/new login.
</p> </div> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/workspaces/neu/apps/frontend/src/pages/terms-and-conditions/index.astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/terms-and-conditions/index.astro";
const $$url = "/terms-and-conditions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
