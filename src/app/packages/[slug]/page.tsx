import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, MapPin, CalendarRange, Users, CalendarCheck } from "lucide-react";
import { packages } from "@/lib/data/packages";
import { packageFaqs } from "@/lib/data/faqs";
import { getPackage, getRelatedPackages } from "@/lib/api/packages";
import { getRegion, getDestination, listHotels } from "@/lib/api/catalogue";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PackageCard } from "@/components/cards/PackageCard";
import { HotelCard } from "@/components/cards/HotelCard";
import { PackageGallery } from "@/components/packages/PackageGallery";
import { PackageHighlights } from "@/components/packages/PackageHighlights";
import { ItineraryAccordion } from "@/components/packages/ItineraryAccordion";
import { BookingPanel } from "@/components/packages/BookingPanel";
import { StickyBookingBar } from "@/components/packages/StickyBookingBar";
import { formatINR } from "@/lib/utils";
import { categoryLabels, durationLabel } from "@/lib/labels";
import { breadcrumbJsonLd, productOfferJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};

  const title = `${pkg.title} — ${pkg.durationDays}D/${pkg.durationNights}N Tour Package`;
  const description = `${pkg.summary} From ${formatINR(pkg.price)} per person, ${pkg.routeCities.join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: { title, description, images: [{ url: pkg.image }] },
    keywords: [pkg.title, ...pkg.routeCities, ...pkg.categories, pkg.type],
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const region = getRegion(pkg.regionSlug);
  const destination = getDestination(pkg.destinationSlug);
  const related = getRelatedPackages(pkg, 3);
  const stays = pkg.destinationSlugs.flatMap((d) => listHotels(d)).slice(0, 3);

  const gallery = Array.from(new Set([pkg.image, ...pkg.gallery]));

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Packages", path: "/packages" },
      ...(region ? [{ name: region.name, path: region.seoPath ?? `/destinations/${region.slug}` }] : []),
      { name: pkg.title, path: `/packages/${pkg.slug}` },
    ]),
    productOfferJsonLd(pkg),
    faqJsonLd(packageFaqs),
  ];

  return (
    <div className="pb-28 lg:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-brand-700">
            Packages
          </Link>
          {region && (
            <>
              <span>/</span>
              <Link
                href={region.seoPath ?? `/destinations/${region.slug}`}
                className="hover:text-brand-700"
              >
                {region.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink-800">{pkg.title}</span>
        </nav>

        {/* Title block */}
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-1.5">
              {pkg.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
                >
                  {categoryLabels[c]}
                </span>
              ))}
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              {pkg.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {pkg.routeCities.join(" • ")}
                {region ? `, ${region.area}` : ""}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarRange className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {durationLabel(pkg.durationDays, pkg.durationNights)}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-brand-600" aria-hidden="true" />
                From {pkg.departureCities.join(" / ")}
              </span>
              <StarRating rating={pkg.rating} reviewCount={pkg.reviewCount} />
            </div>
          </div>
        </div>

        {/* Gallery + booking */}
        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <PackageGallery images={gallery} title={pkg.title} />

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">The trip in short</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700">{pkg.summary}</p>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-sand-50 p-4 text-sm text-ink-700">
                <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold">Best time to travel:</strong>{" "}
                  {pkg.bestTimeToVisit}
                </span>
              </p>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">Package highlights</h2>
              <div className="mt-5">
                <PackageHighlights pkg={pkg} />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                What you will actually do
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {pkg.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink-900">Day-by-day itinerary</h2>
              <p className="mt-1.5 text-sm text-ink-600/70">
                Distances and drive times are realistic estimates for hill and highway conditions,
                not best-case figures.
              </p>
              <div className="mt-5">
                <ItineraryAccordion days={pkg.itinerary} />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                What is and isn&apos;t included
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-brand-900">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Included
                  </h3>
                  <ul className="mt-3.5 space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-sand-200 bg-white p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
                    <X className="h-4 w-4 text-ink-600/50" aria-hidden="true" />
                    Not included
                  </h3>
                  <ul className="mt-3.5 space-y-2.5">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-600/35" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {stays.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Handpicked stays on this route
                </h2>
                <p className="mt-1.5 text-sm text-ink-600/70">
                  Indicative properties in this hotel category — your confirmed hotels are named in
                  your quote.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {stays.map((hotel) => (
                    <HotelCard key={hotel.slug} hotel={hotel} />
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink-900">Good to know</h2>
              <div className="mt-5">
                <FAQAccordion faqs={packageFaqs} />
              </div>
            </section>
          </div>

          {/* Booking rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BookingPanel pkg={pkg} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                You may also like
              </h2>
              <Link
                href={
                  destination
                    ? `/packages?destination=${destination.slug}`
                    : `/packages?region=${pkg.regionSlug}`
                }
                className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                More like this →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PackageCard key={item.slug} pkg={item} />
              ))}
            </div>
          </section>
        )}
      </Container>

      <StickyBookingBar pkg={pkg} />
    </div>
  );
}
