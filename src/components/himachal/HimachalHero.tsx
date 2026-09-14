import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";
import { HimachalEnquiryForm } from "./HimachalEnquiryForm";
import { Container } from "@/components/ui/Container";
import { photo } from "@/lib/images";
import { whatsappLink } from "@/lib/seo";

const WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Himachal Pradesh tour package.";

export function HimachalHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      {/* REPLACE: swap for TheTravelKart's own Himachal photography. */}
      <Image
        src={photo("hp-hero-himalaya", 2000, 1200)}
        alt="Snow-capped Himalayan peaks above a winding mountain road in Himachal Pradesh"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/60 to-ink-900/92" />

      <Container className="relative pb-10 pt-14 sm:pb-14 sm:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
            Himachal-based travel experts · Planning since 2018
          </span>

          <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Himachal Pradesh Tour Packages
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium text-white/85 sm:text-lg lg:text-xl">
            Explore Himachal Your Way — Beautiful Stays, Private Cabs &amp; Custom Itineraries
          </p>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Plan a memorable Himachal holiday with comfortable stays, private transfers, sightseeing
            and locally planned experiences.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#enquiry"
              className="rounded-full bg-sunset-500 px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99]"
            >
              Get Free Quote
            </Link>
            <Link
              href="#packages"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Packages
            </Link>
            <a
              href={whatsappLink(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Or chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Enquiry panel — overlaps the hero base on desktop, stacks on mobile. */}
        <div className="mt-9 rounded-3xl border border-white/15 bg-white/95 p-5 shadow-2xl shadow-ink-900/30 backdrop-blur-md sm:p-6 lg:mt-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-ink-900">
              Tell us your dates — we&apos;ll plan the rest
            </h2>
            <p className="text-xs text-ink-600/65">Free, and no obligation to book.</p>
          </div>
          <HimachalEnquiryForm variant="panel" />
        </div>
      </Container>
    </section>
  );
}
