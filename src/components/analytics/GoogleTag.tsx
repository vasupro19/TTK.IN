export const GA_MEASUREMENT_ID = "G-45L8J9NSWY";
/** Google Ads account; its conversions fire from `GoogleAdsConversion`. */
export const GOOGLE_ADS_ID = "AW-16975764062";

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
 *
 * The same tag also configures the Google Ads account — one gtag.js serves
 * both destinations, and Ads conversion events need that config to be sent.
 */
const SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_MEASUREMENT_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`;

export function GoogleTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script id="google-tag-base" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
    </>
  );
}
