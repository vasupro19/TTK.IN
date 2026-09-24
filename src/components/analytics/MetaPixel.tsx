import { META_PIXEL_ID } from "@/lib/metaPixel";

/**
 * The Meta (Facebook) Pixel base code, split in two because it lives in two
 * places: `MetaPixel` inside the root layout's <head>, `MetaPixelNoscript` in
 * its <body> (an <img> is not allowed in <head>, even inside <noscript>).
 *
 * This is the site's ONLY pixel installation — never add a second one to a
 * page: two installs of the same ID double-count PageView.
 *
 * A plain <script> rather than next/script, because Meta (and anyone auditing
 * the ads setup) expects the snippet literally in the <head> of the served
 * HTML; next/script's strategies all inject it from elsewhere. That is safe
 * here because the root layout never remounts: the server-rendered script runs
 * once per document load, and React does not re-execute it on hydration.
 * Client-side navigations are picked up by the pixel's own history-change
 * tracking, which fires PageView on each pushState. The snippet's
 * `if (f.fbq) return;` guard stops a double init. fbevents.js itself loads
 * async, so none of this blocks rendering.
 *
 * Conversions are fired from the enquiry forms via `trackLead` in
 * `lib/metaPixel`. Do not add other fbq('track', ...) events without agreeing
 * them first — they change what the ad account optimises towards.
 */
const SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export function MetaPixel() {
  return (
    // Meta Pixel Code
    <script id="meta-pixel-base" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
  );
}

export function MetaPixelNoscript() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
