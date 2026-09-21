import Script from "next/script";

/**
 * The Meta (Facebook) Pixel base code.
 *
 * This is the site's ONLY pixel installation — there is no global one in the
 * root layout, and nothing else in the codebase calls `fbq`. Before adding a
 * second `<MetaPixel />` anywhere, check whether the page already inherits
 * this one: two installs of the same ID double-count PageView.
 *
 * `next/script` rather than a raw <script> tag: the id makes Next execute the
 * snippet exactly once per document, including when a visitor reaches the page
 * through a client-side navigation, where an inline <script> in the markup
 * would never run at all. Next injects it into <head>. The snippet's own
 * `if (f.fbq) return;` guard is a second belt against a double init.
 *
 * Base PageView only. Do not add fbq('track', ...) events here without the
 * conversion events being agreed first — they change what the ad account
 * optimises towards.
 */
export const META_PIXEL_ID = "1364797222104383";

export function MetaPixel() {
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
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
      {/* End Meta Pixel Code */}
    </>
  );
}
