export const GA_MEASUREMENT_ID = "G-45L8J9NSWY";

/**
 * The Google tag (gtag.js) for Google Analytics 4, rendered first in the root
 * layout's <head> — Google asks for it "immediately after the <head> element".
 *
 * This is the site's ONLY Google tag — never add a second one to a page: Google
 * says not to, and two installs double-count page views.
 *
 * Plain <script> elements rather than next/script, for the same reason as
 * `MetaPixel`: the snippet is expected literally in the served <head>, and the
 * root layout never remounts, so it runs once per document load. Client-side
 * navigations are counted by GA4's enhanced measurement ("page changes based
 * on browser history events", on by default in the GA property settings).
 */
const SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_MEASUREMENT_ID}');`;

export function GoogleTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script id="google-tag-base" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
    </>
  );
}
