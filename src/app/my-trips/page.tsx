import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Search, FileText, Luggage } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappLink, telLink, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "My Trips — Booking Status & Documents",
  description:
    "Look up a TheTravelKart booking, download your itinerary and vouchers, or reach your trip coordinator directly.",
  alternates: { canonical: "/my-trips" },
  robots: { index: false, follow: true },
};

export default function MyTripsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "My Trips", path: "/my-trips" },
  ]);

  return (
    <div className="py-10 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">My Trips</span>
        </nav>

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          My Trips
        </h1>
        <p className="mt-2.5 text-ink-600/80">
          Find a booking with the reference number from your confirmation message, or just message
          your coordinator — they have everything on hand.
        </p>

        <form
          action="/my-trips"
          method="GET"
          className="mt-8 rounded-2xl border border-sand-200 bg-white p-6"
        >
          <label htmlFor="booking-ref" className="block text-sm font-bold text-ink-900">
            Booking reference
          </label>
          <p className="mt-1 text-xs text-ink-600/65">
            Looks like <code className="rounded bg-sand-100 px-1.5 py-0.5 font-mono">TTK-2026-0143</code> — it is
            in the confirmation we sent on WhatsApp and email.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/40" aria-hidden="true" />
              <input
                id="booking-ref"
                name="ref"
                type="text"
                placeholder="TTK-2026-0143"
                className="w-full rounded-xl border border-sand-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-brand-700 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Find booking
            </button>
          </div>
          <p className="mt-4 rounded-xl bg-sand-50 p-3.5 text-xs leading-relaxed text-ink-600/70">
            Online booking lookup is being connected to our trip management system. Until it is
            live, send your reference on WhatsApp and we will pull up your file straight away —
            usually within minutes during working hours.
          </p>
        </form>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={whatsappLink("Hi TheTravelKart, I'd like an update on my booking. My reference is: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3.5 rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-brand-200"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
            <span>
              <span className="block text-sm font-bold text-ink-900">Message your coordinator</span>
              <span className="mt-1 block text-sm text-ink-600/75">
                Fastest way to get vouchers, driver details or a change made.
              </span>
            </span>
          </a>

          <a
            href={telLink()}
            className="flex items-start gap-3.5 rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-brand-200"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              <span className="block text-sm font-bold text-ink-900">Call us</span>
              <span className="mt-1 block text-sm text-ink-600/75">
                {siteConfig.phoneDisplay} · {siteConfig.altPhoneDisplay}
              </span>
            </span>
          </a>

          <div className="flex items-start gap-3.5 rounded-2xl border border-sand-200 bg-white p-5">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              <span className="block text-sm font-bold text-ink-900">Your documents</span>
              <span className="mt-1 block text-sm text-ink-600/75">
                Itinerary, hotel vouchers and permits are sent on WhatsApp and email before you
                travel.
              </span>
            </span>
          </div>

          <Link
            href="/packages"
            className="flex items-start gap-3.5 rounded-2xl border border-sand-200 bg-white p-5 transition-colors hover:border-brand-200"
          >
            <Luggage className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              <span className="block text-sm font-bold text-ink-900">Planning the next one?</span>
              <span className="mt-1 block text-sm text-ink-600/75">
                Returning travellers get first pick of off-season dates.
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
