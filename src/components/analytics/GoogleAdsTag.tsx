export const GOOGLE_ADS_ID = "AW-16975764062";

/**
 * The Google Ads tag, rendered in the root layout's <head> right after
 * `GoogleTag`, exactly as Google Ads supplied it. It loads gtag.js a second
 * time with the AW- ID; the shared dataLayer and `gtag` function make that
 * harmless.
 *
 * Configure the AW- account here only — adding it to `GoogleTag` as well would
 * send every Ads page view twice. Conversions fire from `GoogleAdsConversion`.
 */
const SNIPPET = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GOOGLE_ADS_ID}');`;

export function GoogleAdsTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
      <script id="google-ads-tag-base" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
    </>
  );
}
