/**
 * Meta Pixel ID and the conversion events the site sends to it. The base code
 * lives in `components/analytics/MetaPixel`, rendered once by the root layout.
 */
export const META_PIXEL_ID = "1364797222104383";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * The standard `Lead` event, fired once an enquiry has been saved by
 * /api/leads — never on a failed or invalid submit, so Ads Manager counts only
 * real leads. A no-op if the pixel is blocked (ad blockers, no JS).
 */
export function trackLead(destination?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "Lead", destination ? { content_name: destination } : undefined);
}
