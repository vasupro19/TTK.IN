"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, PencilLine } from "lucide-react";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { cn } from "@/lib/utils";

const DEFAULT_WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Himachal Pradesh tour package.";

/**
 * Fixed mobile action bar. Appears once the hero is scrolled past so it never
 * covers the hero's own CTAs, and hides again over the enquiry form so it does
 * not sit on top of the fields.
 */
export function MobileBottomCTA({
  whatsappMessage = DEFAULT_WA_MESSAGE,
  hideFloatingActions = false,
}: {
  whatsappMessage?: string;
  /**
   * Hide the site-wide floating Call / WhatsApp buttons on mobile while this
   * bar is mounted. The bar already carries both, and the floating pair
   * otherwise sits over card prices and buttons as the page scrolls. The hero
   * and the closing section have their own WhatsApp buttons, so there is never
   * a screen without one. Desktop is unaffected (the bar is hidden there).
   */
  hideFloatingActions?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  // Tell the rest of the layout that this page reserves the bottom of the
  // viewport, so the floating Call/WhatsApp stack lifts above the bar instead
  // of landing on top of Get Quote. Set while the bar is mounted rather than
  // while it is on screen: the buttons keep one position through the whole
  // scroll instead of hopping as the bar comes and goes.
  useEffect(() => {
    document.body.dataset.bottomBar = "landing";
    if (hideFloatingActions) document.body.dataset.hideFloatingActions = "";
    return () => {
      delete document.body.dataset.bottomBar;
      delete document.body.dataset.hideFloatingActions;
    };
  }, [hideFloatingActions]);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("enquiry");
      const pastHero = window.scrollY > 520;
      const overForm = form
        ? form.getBoundingClientRect().top < window.innerHeight &&
          form.getBoundingClientRect().bottom > 0
        : false;
      setVisible(pastHero && !overForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white/95 px-3 pt-2.5 backdrop-blur-md transition-transform duration-300 lg:hidden",
        // Clears the home indicator on handsets that reserve space for it.
        "pb-[calc(0.625rem+env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telLink()}
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl border border-sand-200 py-2 text-[11px] font-semibold text-ink-800"
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] py-2 text-[11px] font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <EnquiryButton className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl bg-sunset-500 py-2 text-[11px] font-semibold text-white">
          <PencilLine className="h-4 w-4" aria-hidden="true" />
          Get Quote
        </EnquiryButton>
      </div>
    </div>
  );
}
