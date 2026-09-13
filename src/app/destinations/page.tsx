import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/lib/data/regions";
import { destinations, getDestinationsByRegion } from "@/lib/data/destinations";
import { getPackagesByRegion, getPackagesByDestination } from "@/lib/data/packages";
import { RegionCard } from "@/components/cards/RegionCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Destinations — Domestic & International Holiday Spots",
  description:
    "Explore every destination TheTravelKart curates packages for, from Himalayan hill towns to Southeast Asian island escapes.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await searchParams;
  const activeType = typeof type === "string" ? type : "";

  const shownRegions = activeType ? regions.filter((r) => r.type === activeType) : regions;
  const shownDestinations = activeType
    ? destinations.filter((d) => d.type === activeType)
    : destinations;

  const tabs = [
    { value: "", label: "All" },
    { value: "domestic", label: "Domestic" },
    { value: "international", label: "International" },
  ];

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Explore Destinations
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          {shownRegions.length} regions and {shownDestinations.length} destinations across India and
          abroad. Start with a region, then pick the town — every one has its own packages, hotels,
          and things to do.
        </p>

        <div className="mt-6 flex gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value ? `/destinations?type=${tab.value}` : "/destinations"}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeType === tab.value
                  ? "bg-brand-700 text-white"
                  : "bg-sand-100 text-ink-700 hover:bg-sand-200"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shownRegions.map((region, i) => (
            <RegionCard
              key={region.slug}
              region={region}
              destinationCount={getDestinationsByRegion(region.slug).length}
              packageCount={getPackagesByRegion(region.slug).length}
              priority={i < 3}
            />
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink-900">Every destination A–Z</h2>
          <p className="mt-1 text-sm text-ink-600/70">
            Jump straight to a town — the number in brackets is how many packages cover it.
          </p>

          <div className="mt-6 space-y-8">
            {shownRegions.map((region) => {
              const regionDestinations = getDestinationsByRegion(region.slug);
              if (regionDestinations.length === 0) return null;

              return (
                <div key={region.slug}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-sand-200 pb-2">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      <Link href={`/destinations/${region.slug}`} className="hover:text-brand-700">
                        {region.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-ink-600/60">{region.area}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {regionDestinations.map((destination) => (
                      <Link
                        key={destination.slug}
                        href={`/destinations/${destination.slug}`}
                        className="rounded-full bg-sand-100 px-3.5 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-700 hover:text-white"
                      >
                        {destination.name}
                        <span className="ml-1.5 text-xs opacity-60">
                          ({getPackagesByDestination(destination.slug).length})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
