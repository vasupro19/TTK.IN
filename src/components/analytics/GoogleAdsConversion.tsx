"use client";

import { useEffect, useRef } from "react";
import { GOOGLE_ADS_ID } from "@/components/analytics/GoogleTag";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * The Google Ads "Outbound click" conversion, rendered on /thank-you.
 *
 * Fired from an effect rather than an inline <script>: the forms reach
 * /thank-you with router.push, and React never executes a script rendered
 * during a client-side navigation. The ref stops a second fire when Strict
 * Mode re-runs effects in development. A no-op if gtag is blocked.
 */
export function GoogleAdsConversion() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || typeof window.gtag !== "function") return;
    fired.current = true;
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/rwM6CMKa07MaEN601p4_`,
      value: 1.0,
      currency: "INR",
    });
  }, []);

  return null;
}
