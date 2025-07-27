import { c as createComponent, a as createAstro, e as renderHead, d as renderComponent, f as renderSlot, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_LK4p-fTz.mjs';
/* empty css                                     */
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_BtNhA7pc.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$FeaturesLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturesLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Neureal Features</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main class="services-container"> <h1 class="bold-text service-title">${title}</h1> <div class="service-content"> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderComponent($$result, "Footer", $$Footer, {})}  </body> </html>`;
}, "/workspaces/neu/apps/frontend/src/layouts/FeaturesLayout.astro", void 0);

const featureArticles = {
  dashboard: {
    title: "Dashboard",
    content: `
        <h2>Take Control of Your Channel</h2>
        <p>From your dashboard, you can access everything you need to understand and improve your content strategy, It’s built to give you a professional view of your social media performance.</p>
  
        <h2>What You Can See</h2>
        <ol>
          <li>How many views your channel is getting</li>
          <li>The number of views on your top-performing video</li>
          <li>Your current subscriber count</li>
          <li>Recent activity and growth trends</li>
          <li>Highlights of your latest achievements</li>
        </ol>
  
        <h2>Why It Matters</h2>
        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Benefits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Recent Views</td>
              <td>Track how your audience is reacting to new content instantly</td>
            </tr>
            <tr>
              <td>Top Video Insights</td>
              <td>Understand what type of content works best for your audience</td>
            </tr>
            <tr>
              <td>Subscriber Stats</td>
              <td>Measure your growth and retention over time</td>
            </tr>
            <tr>
              <td>Professional Design</td>
              <td>Focus on clarity and performance without distractions</td>
            </tr>
            <tr>
              <td>Performance Review</td>
              <td>Keep track of your progress and celebrate milestones</td>
            </tr>
          </tbody>
        </table>
  
        <p>The dashboard isn’t just a stats panel, it’s your command center to improve, stay focused, and move forward in your journey as a content maker.</p>
      `,
  },

  "trends-section": {
    title: "Trends Section",
    content: `
          <h2>Discover What’s Trending Right Now</h2>
          <p>The trend section lets you explore the latest general trends in real time and gives you the ability to engage by sharing your thoughts or joining the conversation.</p>
    
          <h2>What You Can Do</h2>
          <ol>
            <li>Browse current viral trends across platforms</li>
            <li>See what topics are gaining attention fast</li>
            <li>Join discussions and leave your own comments</li>
            <li>Stay informed and ahead of the curve</li>
          </ol>
    
          <h2>Why Trends Matter</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Access To A Trend Feed</td>
                <td>Keep your content relevant and aligned with what people care about</td>
              </tr>
              <tr>
                <td>Comment About The Trends</td>
                <td>Engage with other creators and express your take on hot topics</td>
              </tr>
              <tr>
                <td>Fast Discovery</td>
                <td>Find inspiration for new videos and social content easily</td>
              </tr>
              <tr>
                <td>Content Awareness</td>
                <td>Stay updated with shifts in audience interest</td>
              </tr>
            </tbody>
          </table>
    
          <p>The trend section is more than just a feed, it's your gateway to creativity, inspiration, and community-driven content awareness.</p>
        `,
  },

  community: {
    title: "Community",
    content: `
        <h2>Comment, React, and Connect</h2>
        <p>The community section extends the trend experience by allowing you to express your opinion on current trends and exchange comments directly with others.</p>
  
        <h2>What You Can Do</h2>
        <ol>
          <li>React to trending topics with your personal take</li>
          <li>Read other users' comments and perspectives</li>
          <li>Join conversations by replying or liking comments</li>
          <li>Build authentic connections through shared viewpoints</li>
        </ol>
  
        <h2>How It Helps You Grow</h2>
        <table>
          <thead>
            <tr>
              <th>Interaction</th>
              <th>Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Opinion Sharing</td>
              <td>Establish your voice on relevant and timely topics</td>
            </tr>
            <tr>
              <td>Comment Threads</td>
              <td>Exchange insights with other content makers or viewers</td>
            </tr>
            <tr>
              <td>Engagement Visibility</td>
              <td>Increase exposure by staying active in conversations</td>
            </tr>
            <tr>
              <td>Collaborative Vibe</td>
              <td>Find others who resonate with your thoughts and style</td>
            </tr>
          </tbody>
        </table>
  
        <p>By sharing your voice in the community, you help refine and elevate these trends.</p>
      `,
  },

  workspaces: {
    title: "Workspaces",
    content: `
        <h2>Master Your Social Media Algorithm</h2>
        <p>In the Workspaces section, you gain powerful tools and insights to understand how social media algorithms work, helping you grow your presence strategically.</p>
  
        <h3>What You Can Do in Workspaces</h3>
        <ol>
          <li>Analyze algorithm behavior for different platforms</li>
          <li>Create and manage multiple projects efficiently</li>
          <li>Track your progress and key performance metrics</li>
          <li>Access tutorials and tips tailored to your goals</li>
        </ol>
  
        <h3>Benefits of Using Workspaces</h3>
        <table>
          <thead>
            <tr>
              <th>Benefit</th>
              <th>Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Algorithm Insights</td>
              <td>Understand how your content is prioritized and displayed.</td>
            </tr>
            <tr>
              <td>Project Management</td>
              <td>Organize your tasks and content strategies in one place.</td>
            </tr>
            <tr>
              <td>Performance Tracking</td>
              <td>Monitor your growth and adjust strategies quickly.</td>
            </tr>
            <tr>
              <td>Expert Guidance</td>
              <td>Learn best practices and avoid common pitfalls.</td>
            </tr>
          </tbody>
        </table>
      `,
  },

  "ai-assistants": {
    title: "AI Assistants",
    content: `
          <h2>Five Professional AI Assistants at Your Service</h2>
          <p>Access five smart AI assistants designed to help you boost productivity, creativity, and decision-making across various tasks. Currently, you can communicate efficiently with them to get the most out of their capabilities.</p>
    
          <h3>Capabilities of Our AI Assistants</h3>
          <ol>
            <li>Generate high-quality content quickly and efficiently</li>
            <li>Provide data-driven insights and recommendations</li>
            <li>Automate repetitive tasks to save you time</li>
            <li>Assist with research and trend analysis</li>
            <li>Enhance communication with smart language tools</li>
          </ol>
    
          <h3>Benefits of Using AI Assistants</h3>
          <table>
            <thead>
              <tr>
                <th>Benefit</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Increased Productivity</td>
                <td>Complete tasks faster and with greater accuracy.</td>
              </tr>
              <tr>
                <td>Improved Creativity</td>
                <td>Get fresh ideas and inspiration effortlessly.</td>
              </tr>
              <tr>
                <td>Better Decision-Making</td>
                <td>Rely on data and analysis to guide your strategies.</td>
              </tr>
              <tr>
                <td>Time Savings</td>
                <td>Automate routine work and focus on what matters.</td>
              </tr>
              <tr>
                <td>Enhanced Communication</td>
                <td>Craft clearer messages with AI-powered language help.</td>
              </tr>
            </tbody>
          </table>
        `,
  },
};

const $$Astro = createAstro();
async function getStaticPaths() {
  return Object.keys(featureArticles).map((slug) => ({
    params: { slug }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const feature = featureArticles[slug];
  if (!feature) {
    return new Response(null, {
      status: 404,
      statusText: "Feature not found"
    });
  }
  const { title, content } = feature;
  return renderTemplate`${renderComponent($$result, "FeaturesLayout", $$FeaturesLayout, { "title": title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article>${unescapeHTML(content)}</article> ` })}`;
}, "/workspaces/neu/apps/frontend/src/pages/features/[slug].astro", void 0);

const $$file = "/workspaces/neu/apps/frontend/src/pages/features/[slug].astro";
const $$url = "/features/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
