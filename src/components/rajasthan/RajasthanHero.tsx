import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { whatsappLink } from "@/lib/seo";
import { RAJASTHAN_WA_MESSAGE, rajasthanTrustPoints } from "@/lib/data/rajasthan";

/**
 * One photograph, not a collage: Jaisalmer's fort at sunset. The two scrims
 * are there for legibility only — a vertical one so the header and trust row
 * sit on dark ground, and a horizontal one on wide screens so the text column
 * reads while the fort stays visible on the right.
 */
export function RajasthanHero() {
  return (
    <section className="relative isolate overflow-hidden bg-jodhpur-900">
      <SmartImage
        seed="rj-hero"
        preload
        sizes="100vw"
        className="object-cover object-[60%_45%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/35 to-ink-900/85 lg:from-ink-900/55 lg:via-ink-900/10 lg:to-ink-900/70" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-900/80 via-ink-900/35 to-transparent lg:block" />

      <Container className="relative pb-10 pt-14 sm:pb-14 sm:pt-20 lg:pb-20 lg:pt-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-sandstone-100 backdrop-blur-sm">
            Rajasthan Tour Packages
          </p>

          <h1 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Royal Rajasthan, Your Way
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Explore grand forts, colourful cities, desert landscapes and heritage stays with
            thoughtfully planned Rajasthan holidays, private cabs and custom itineraries.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <EnquiryButton className="rounded-full bg-sunset-500 px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99]">
              Get Free Quote
            </EnquiryButton>
            <Link
              href="#packages"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Packages
            </Link>
            <a
              href={whatsappLink(RAJASTHAN_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[13px] font-medium text-white/85 sm:text-sm">
            {rajasthanTrustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0 text-sandstone-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
