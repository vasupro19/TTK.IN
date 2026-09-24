import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { whatsappLink } from "@/lib/seo";
import { SPITI_WA_MESSAGE, spitiTrustPoints } from "@/lib/data/spiti";

/**
 * One photograph: Key Monastery in low evening light, with the valley and the
 * river running away behind it. The scrims are kept to what legibility needs —
 * a left-hand one on wide screens, where the monastery sits clear on the
 * right, and a lower-weighted vertical one on phones, where text covers more
 * of the frame. The sky and the light are left alone.
 */
export function SpitiHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 lg:flex lg:min-h-[640px] lg:items-center">
      <SmartImage
        seed="sp-hero"
        preload
        sizes="100vw"
        className="object-cover object-[62%_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/85 lg:from-slate-950/30 lg:via-transparent lg:to-slate-950/50" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-slate-950/75 via-slate-950/25 to-transparent lg:block" />

      <Container className="relative pb-10 pt-14 sm:pb-14 sm:pt-20 lg:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-100 backdrop-blur-sm">
            Spiti Valley Tour Packages
          </p>

          <h1 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Into the Wild Heart of Spiti
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Travel through one of the Himalayas&apos; most dramatic high-altitude landscapes — remote
            villages, ancient monasteries, mountain passes and the legendary roads of Spiti Valley.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <EnquiryButton className="rounded-full bg-sunset-500 px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99]">
              Get Free Quote
            </EnquiryButton>
            <Link
              href="#packages"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Explore Packages
            </Link>
            <a
              href={whatsappLink(SPITI_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[13px] font-medium text-white/85 sm:text-sm">
            {spitiTrustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
