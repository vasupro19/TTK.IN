import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Package } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { siteConfig } from "@/lib/seo";

/** Mobile-only action bar pinned to the bottom of package detail pages. */
export function StickyBookingBar({ pkg }: { pkg: Package }) {
  const whatsappText = encodeURIComponent(
    `Hi TheTravelKart, I'd like a quote for "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N).`
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-ink-600/60">From</p>
          <p className="font-display text-lg font-extrabold leading-tight text-ink-900">
            {formatINR(pkg.price)}
            <span className="ml-1 text-[11px] font-medium text-ink-600/55">/person</span>
          </p>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ask about this trip on WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
        <Link
          href={`/plan-my-trip?package=${pkg.slug}`}
          className="shrink-0 rounded-full bg-sunset-500 px-6 py-3.5 text-sm font-bold text-white"
        >
          Book This Trip
        </Link>
      </div>
    </div>
  );
}
