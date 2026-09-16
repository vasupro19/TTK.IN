"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, PencilLine } from "lucide-react";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { cn } from "@/lib/utils";

const WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Himachal Pradesh tour package.";

/**
 * Fixed mobile action bar. Appears once the hero is scrolled past so it never
 * covers the hero's own CTAs, and hides again over the enquiry form so it does
 * not sit on top of the fields.
 */
export function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

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
        "fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white/95 px-3 py-2.5 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telLink()}
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl border border-sand-200 py-2.5 text-[11px] font-semibold text-ink-800"
          aria-label={`Call ${siteConfig.phoneDisplay}`}
        >
          <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappLink(WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] py-2.5 text-[11px] font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <EnquiryButton className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-sunset-500 py-2.5 text-[11px] font-semibold text-white">
          <PencilLine className="h-4 w-4" aria-hidden="true" />
          Get Quote
        </EnquiryButton>
      </div>
    </div>
  );
}
