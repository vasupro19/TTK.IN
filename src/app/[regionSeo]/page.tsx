import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { regions } from "@/lib/data/regions";
import { listDestinations } from "@/lib/api/catalogue";
import { searchPackages } from "@/lib/api/packages";
import { PackageCard } from "@/components/cards/PackageCard";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { photo } from "@/lib/images";

/**
 * SEO landing pages at /himachal-pradesh-tour-packages, /kashmir-tour-packages, etc.
 * `dynamicParams = false` means anything not in this list 404s, so this root
 * dynamic segment never swallows unrelated URLs.
 */
export const dynamicParams = false;

function regionFromParam(regionSeo: string) {
  return regions.find((r) => r.seoPath === `/${regionSeo}`);
}

/**
 * Himachal and Rajasthan have dedicated, much deeper landing pages at
 * /himachal-pradesh-tour-packages and /rajasthan-tour-packages, so they are
 * excluded here to avoid two routes claiming the same path.
 */
const DEDICATED_LANDING_PAGES = new Set(["himachal", "rajasthan"]);

export function generateStaticParams() {
  return regions
    .filter((r) => r.seoPath && !DEDICATED_LANDING_PAGES.has(r.slug))
    .map((r) => ({ regionSeo: r.seoPath!.replace(/^\//, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regionSeo: string }>;
}): Promise<Metadata> {
  const { regionSeo } = await params;
  const region = regionFromParam(regionSeo);
  if (!region) return {};

  const count = searchPackages({ regionSlug: region.slug }).length;
  const title = `${region.name} Tour Packages — ${count} Itineraries from ${formatINR(region.startingPrice)}`;
  const description = `${region.description} Compare ${count} ${region.name} packages with verified stays, private transfers and transparent pricing.`;

  return {
    title,
    description,
    alternates: { canonical: region.seoPath },
    openGraph: { title, description, images: [{ url: photo(region.imageSeed) }] },
    keywords: [
      `${region.name} tour packages`,
      `${region.name} holiday packages`,
      `${region.name} trip cost`,
      `${region.name} itinerary`,
    ],
  };
}

export default async function RegionLandingPage({
  params,
}: {
  params: Promise<{ regionSeo: string }>;
}) {
  const { regionSeo } = await params;
  const region = regionFromParam(regionSeo);
  if (!region) notFound();

  const packages = searchPackages({ regionSlug: region.slug, sort: "popular" });
  const towns = listDestinations(region.slug);

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: `${region.name} Tour Packages`, path: region.seoPath! },
  ]);

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative flex min-h-[380px] items-end overflow-hidden sm:min-h-[460px]">
        <SmartImage
          seed={region.imageSeed}
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/20" />
        <Container className="relative pb-10 pt-16 text-white">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/destinations" className="hover:text-white">
              Destinations
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/90">{region.name}</span>
          </nav>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {region.name} Tour Packages
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">{region.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span>
              <strong className="font-semibold text-white">{packages.length}</strong> itineraries
            </span>
            <span>
              <strong className="font-semibold text-white">{towns.length}</strong> destinations
            </span>
            <span>
              From{" "}
              <strong className="font-semibold text-white">
                {formatINR(region.startingPrice)}
              </strong>{" "}
              per person
            </span>
          </div>
        </Container>
      </section>

      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-base leading-relaxed text-ink-700">{region.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {region.popularFor.map((tag) => (
                <Badge key={tag} tone="brand">
                  {tag}
                </Badge>
              ))}
            </div>

            {towns.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Where to go in {region.name}
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {towns.map((town) => (
                    <DestinationCard key={town.slug} destination={town} />
                  ))}
                </div>
              </section>
            )}

            <section className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  {region.name} packages
                </h2>
                <Link
                  href={`/packages?region=${region.slug}`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Filter and compare
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {packages.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {packages.map((pkg, i) => (
                    <PackageCard key={pkg.slug} pkg={pkg} priority={i < 2} />
                  ))}
                </div>
              ) : (
                <p className="mt-6 rounded-2xl border border-dashed border-sand-200 p-8 text-center text-sm text-ink-600/70">
                  We run trips here on request — tell us your dates and we will build the itinerary.
                </p>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <MapPin className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
                Plan a custom {region.name} trip
              </h2>
              <p className="mt-2 text-sm text-ink-600/75">
                Different dates, a different route, or a group size we should price for? Tell us and
                we will build it.
              </p>
              <div className="mt-5">
                <LeadForm compact defaultDestination={region.name} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
