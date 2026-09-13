import type { Metadata } from "next";
import { hotels } from "@/lib/data/hotels";
import { getDestinationBySlug, destinations } from "@/lib/data/destinations";
import { HotelCard } from "@/components/cards/HotelCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hotels — Handpicked Stays Across India & Abroad",
  description:
    "Browse handpicked hotels, resorts and homestays across TheTravelKart's destinations, from budget-friendly cottages to 5-star beachfront resorts.",
  alternates: { canonical: "/hotels" },
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { destination } = await searchParams;
  const activeDestination = typeof destination === "string" ? destination : "";

  const filtered = activeDestination
    ? hotels.filter((h) => h.destinationSlug === activeDestination)
    : hotels;

  const destinationsWithHotels = destinations.filter((d) =>
    hotels.some((h) => h.destinationSlug === d.slug)
  );

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Handpicked Stays
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          Every property here has been stayed in or inspected by someone on our team. Rates are per night with taxes shown separately — no surprises at checkout.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/hotels"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              !activeDestination ? "bg-brand-700 text-white" : "bg-sand-100 text-ink-700 hover:bg-sand-200"
            )}
          >
            All destinations
          </Link>
          {destinationsWithHotels.map((d) => (
            <Link
              key={d.slug}
              href={`/hotels?destination=${d.slug}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeDestination === d.slug
                  ? "bg-brand-700 text-white"
                  : "bg-sand-100 text-ink-700 hover:bg-sand-200"
              )}
            >
              {d.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hotel, i) => {
            const destinationData = getDestinationBySlug(hotel.destinationSlug);
            return (
              <div key={hotel.slug}>
                <HotelCard hotel={hotel} priority={i < 2} />
                {destinationData && (
                  <p className="mt-2 text-xs text-ink-600/60">
                    📍 {destinationData.name}, {destinationData.country}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
