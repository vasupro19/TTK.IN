import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { searchPackages } from "@/lib/api/packages";
import { getRegion, getDestination } from "@/lib/api/catalogue";
import { PackageCard } from "@/components/cards/PackageCard";
import { PackageFilters } from "@/components/packages/PackageFilters";
import { SortLinks } from "@/components/packages/SortLinks";
import { Container } from "@/components/ui/Container";
import { breadcrumbJsonLd } from "@/lib/seo";
import {
  parsePackageParams,
  buildPackageHref,
  activeFilterCount,
  type RawSearchParams,
} from "@/lib/package-search-params";

export const metadata: Metadata = {
  title: "Holiday Packages — Compare Trips Across India & Abroad",
  description:
    "Browse and filter every TheTravelKart itinerary by destination, budget, duration, hotel category, meals and departure city. Transparent pricing, verified stays, real trip support.",
  alternates: { canonical: "/packages" },
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = await searchParams;
  const { query, active, sort } = parsePackageParams(params);
  const results = searchPackages(query);

  const region = active.region ? getRegion(active.region) : undefined;
  const destination = active.destination ? getDestination(active.destination) : undefined;
  const scope = destination ?? region;
  const filterCount = activeFilterCount(active);

  const heading = active.q
    ? `Packages matching “${active.q}”`
    : scope
      ? `${scope.name} Holiday Packages`
      : "Trips Made for You";

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
  ]);

  return (
    <div className="py-8 sm:py-12">
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
          <span className="text-ink-800">Packages</span>
        </nav>

        <div className="mb-7">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 max-w-2xl text-ink-600/75">
            {scope
              ? scope.tagline
              : "Every itinerary we run, filterable down to the hotel category and the meal plan. Nothing hidden until checkout."}
          </p>
        </div>

        {/* Keyword search — always visible, preserves the other filters. */}
        <form action="/packages" method="GET" className="mb-7 flex flex-col gap-3 sm:flex-row">
          {active.region && <input type="hidden" name="region" value={active.region} />}
          {active.type && <input type="hidden" name="type" value={active.type} />}
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600/40"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              defaultValue={active.q}
              placeholder="Search a destination, route or trip — Manali, Pangong, houseboat…"
              aria-label="Search packages"
              className="w-full rounded-full border border-sand-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[290px_1fr]">
          {/* Filters: a disclosure on mobile, a sticky rail on desktop. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="group lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-full border border-sand-200 bg-white px-5 py-3 text-sm font-semibold text-ink-900">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Filters
                  {filterCount > 0 && (
                    <span className="rounded-full bg-brand-700 px-2 py-0.5 text-xs text-white">
                      {filterCount}
                    </span>
                  )}
                </span>
                <span className="text-xs text-ink-600/60 group-open:hidden">Show</span>
                <span className="hidden text-xs text-ink-600/60 group-open:inline">Hide</span>
              </summary>
              <div className="mt-3">
                <PackageFilters active={active} />
              </div>
            </details>
            <div className="hidden lg:block">
              <PackageFilters active={active} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-600/70">
                <strong className="font-semibold text-ink-900">{results.length}</strong> package
                {results.length !== 1 ? "s" : ""} found
                {filterCount > 0 && ` · ${filterCount} filter${filterCount !== 1 ? "s" : ""} applied`}
              </p>
              <SortLinks
                currentSort={sort}
                buildHref={(nextSort) => buildPackageHref(active, { sort: nextSort })}
              />
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((pkg, i) => (
                  <PackageCard key={pkg.slug} pkg={pkg} priority={i < 3} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-sand-200 bg-white p-12 text-center">
                <p className="font-display text-lg font-bold text-ink-900">
                  Nothing matches those filters yet.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink-600/70">
                  We run far more trips than we list. Tell us what you had in mind and we will build
                  it — most custom itineraries are quoted within a working day.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/packages"
                    className="rounded-full border border-sand-200 px-5 py-2.5 text-sm font-semibold text-ink-700 hover:bg-sand-50"
                  >
                    Clear filters
                  </Link>
                  <Link
                    href="/plan-my-trip"
                    className="rounded-full bg-sunset-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sunset-600"
                  >
                    Plan a custom trip
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
