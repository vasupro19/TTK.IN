import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { deals } from "@/lib/data/deals";
import { DealCard } from "@/components/cards/DealCard";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Deals — Off-Season & Early-Bird Rates",
  description:
    "Current TheTravelKart offers on Himachal, Kashmir, Ladakh, Kerala, Rajasthan, Andaman and international packages. Real off-season pricing, with the dates we still have inventory for.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
  ]);

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Deals</span>
        </nav>

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Travel More. Spend Less.
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          These are genuine off-season and early-bird rates on dates we still hold inventory for —
          not a permanent strike-through price. When a window closes, the deal comes down.
        </p>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal, i) => (
            <div key={deal.slug}>
              <DealCard deal={deal} priority={i < 3} />
              <p className="mt-2 flex items-center gap-1.5 px-1 text-xs text-ink-600/60">
                <Tag className="h-3 w-3" aria-hidden="true" />
                Valid for departures booked before {formatDate(deal.validTill)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-ink-900 px-6 py-10 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Travelling on different dates?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Off-season pricing moves week to week. Tell us your dates and we will quote the best
            rate we can actually hold for you.
          </p>
          <Link
            href="/plan-my-trip"
            className="mt-6 inline-block rounded-full bg-sunset-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sunset-600"
          >
            Get a custom quote
          </Link>
        </div>
      </Container>
    </div>
  );
}
