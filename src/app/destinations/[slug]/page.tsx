import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegionBySlug } from "@/lib/data/regions";
import {
  destinations,
  getDestinationBySlug,
  getDestinationsByRegion,
} from "@/lib/data/destinations";
import { getPackagesByDestination, getPackagesByRegion } from "@/lib/data/packages";
import { getHotelsByDestination } from "@/lib/data/hotels";
import { getActivitiesByDestination } from "@/lib/data/activities";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PackageCard } from "@/components/cards/PackageCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { HotelCard } from "@/components/cards/HotelCard";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { Button } from "@/components/ui/Button";
import { breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return [
    ...regions.map((r) => ({ slug: r.slug })),
    ...destinations.map((d) => ({ slug: d.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  const destination = region ? undefined : getDestinationBySlug(slug);
  const entity = region ?? destination;
  if (!entity) return {};

  const title = region
    ? `${region.name} Tour Packages — ${region.area}`
    : `${entity.name} Tour Packages & Travel Guide`;

  return {
    title,
    description: entity.description,
    alternates: { canonical: `/destinations/${entity.slug}` },
    openGraph: { title, description: entity.description, images: [{ url: entity.image }] },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (region) {
    const regionDestinations = getDestinationsByRegion(region.slug);
    const regionPackages = getPackagesByRegion(region.slug);

    const jsonLd = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
      { name: region.name, path: `/destinations/${region.slug}` },
    ]);

    return (
      <div className="pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative flex h-[360px] items-end overflow-hidden sm:h-[440px]">
          <Image
            src={region.image}
            alt={region.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
          <Container className="relative pb-8 text-white">
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">
              {region.area}
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-5xl">{region.name}</h1>
            <p className="mt-2 max-w-xl text-white/85">{region.tagline}</p>
          </Container>
        </section>

        <Container className="mt-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-base leading-relaxed text-ink-600/85">{region.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {region.popularFor.map((tag) => (
                  <Badge key={tag} tone="brand">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-sand-200 bg-white p-6">
              <p className="text-xs text-ink-600/60">Packages starting from</p>
              <p className="mt-1 text-2xl font-extrabold text-ink-900">
                ₹{region.startingPrice.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-ink-600/50">per person</p>
              <p className="mt-3 text-sm text-ink-600/70">
                {regionPackages.length} package{regionPackages.length !== 1 ? "s" : ""} across{" "}
                {regionDestinations.length} destination{regionDestinations.length !== 1 ? "s" : ""}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button href={`/packages?region=${region.slug}`} className="w-full">
                  View All Packages
                </Button>
                <Button href="/contact" variant="ghost" className="w-full">
                  Plan a Custom Trip
                </Button>
              </div>
            </aside>
          </div>

          {regionDestinations.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Where to go in {region.name}
              </h2>
              <p className="mt-1 text-sm text-ink-600/70">
                Pick a town to see its packages, hotels and activities.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {regionDestinations.map((destination, i) => (
                  <DestinationCard
                    key={destination.slug}
                    destination={destination}
                    priority={i < 2}
                  />
                ))}
              </div>
            </section>
          )}

          {regionPackages.length > 0 && (
            <section className="mt-14">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  {region.name} Packages
                </h2>
                <Link
                  href={`/packages?region=${region.slug}`}
                  className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  View all →
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regionPackages.map((pkg) => (
                  <PackageCard key={pkg.slug} pkg={pkg} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    );
  }

  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const parentRegion = getRegionBySlug(destination.regionSlug);
  const relatedPackages = getPackagesByDestination(destination.slug);
  const relatedHotels = getHotelsByDestination(destination.slug);
  const relatedActivities = getActivitiesByDestination(destination.slug);
  const siblings = getDestinationsByRegion(destination.regionSlug).filter(
    (d) => d.slug !== destination.slug
  );

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    ...(parentRegion
      ? [{ name: parentRegion.name, path: `/destinations/${parentRegion.slug}` }]
      : []),
    { name: destination.name, path: `/destinations/${destination.slug}` },
  ]);

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative flex h-[360px] items-end overflow-hidden sm:h-[440px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
        <Container className="relative pb-8 text-white">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">
            {parentRegion ? (
              <Link href={`/destinations/${parentRegion.slug}`} className="hover:text-white">
                {parentRegion.name}
              </Link>
            ) : (
              destination.country
            )}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-2 max-w-xl text-white/85">{destination.tagline}</p>
        </Container>
      </section>

      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-base leading-relaxed text-ink-600/85">{destination.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {destination.popularFor.map((tag) => (
                <Badge key={tag} tone="brand">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {destination.gallery.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`${destination.name} photo ${i + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-sand-200 bg-white p-6">
            <p className="text-xs text-ink-600/60">Packages starting from</p>
            <p className="mt-1 text-2xl font-extrabold text-ink-900">
              ₹{destination.startingPrice.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-ink-600/50">per person</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href={`/packages?destination=${destination.slug}`} className="w-full">
                View Packages
              </Button>
              <Button href="/contact" variant="ghost" className="w-full">
                Plan a Custom Trip
              </Button>
            </div>
          </aside>
        </div>

        {relatedPackages.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Packages for {destination.name}
              </h2>
              <Link
                href={`/packages?destination=${destination.slug}`}
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View all →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </section>
        )}

        {relatedHotels.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Hotels in {destination.name}
              </h2>
              <Link
                href="/hotels"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View all →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedHotels.map((hotel) => (
                <HotelCard key={hotel.slug} hotel={hotel} />
              ))}
            </div>
          </section>
        )}

        {relatedActivities.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Things to do in {destination.name}
              </h2>
              <Link
                href="/activities"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View all →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedActivities.map((activity) => (
                <ActivityCard key={activity.slug} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && parentRegion && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              More in {parentRegion.name}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {siblings.slice(0, 4).map((sibling) => (
                <DestinationCard key={sibling.slug} destination={sibling} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
