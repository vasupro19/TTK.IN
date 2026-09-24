import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PackageExplorer,
  type CustomCardData,
  type PackageCardData,
} from "@/components/landing/PackageExplorer";
import {
  spitiBudgets,
  spitiCustomCard,
  spitiDurations,
  spitiLandingPackages,
  spitiTripTypes,
} from "@/lib/data/spiti";
import { packages as allPackages } from "@/lib/data/packages";
import { image } from "@/lib/images";
import { whatsappLink } from "@/lib/seo";

/** Cards for the landing page, resolved on the server (see PackageExplorer). */
export function spitiPackageCards(): PackageCardData[] {
  return spitiLandingPackages.flatMap((entry) => {
    const pkg = allPackages.find((p) => p.slug === entry.slug);
    if (!pkg) return [];
    const resolved = image(pkg.imageSeed);
    return [
      {
        slug: pkg.slug,
        title: pkg.title,
        route: pkg.routeCities,
        nights: pkg.durationNights,
        days: pkg.durationDays,
        price: pkg.price,
        strikeThroughPrice: pkg.strikeThroughPrice,
        hotelCategory: pkg.hotelCategory,
        summary: pkg.summary,
        categories: entry.tags,
        featured: false,
        badge: entry.badge,
        stayLine: entry.stayLine,
        note: entry.note,
        imageSrc: resolved.src,
        imageAlt: resolved.alt,
        whatsappHref: whatsappLink(
          `Hi TheTravelKart, I'd like to enquire about the "${pkg.title}" Spiti package (${pkg.durationNights} nights / ${pkg.durationDays} days).`,
        ),
      },
    ];
  });
}

function customCard(): CustomCardData {
  const { imageSeed, ...copy } = spitiCustomCard;
  const resolved = image(imageSeed);
  return {
    ...copy,
    imageSrc: resolved.src,
    imageAlt: resolved.alt,
    whatsappHref: whatsappLink(
      "Hi TheTravelKart, I'd like to build my own Spiti trip. My dates and route are:",
    ),
  };
}

export function SpitiPackages({ cards }: { cards: PackageCardData[] }) {
  return (
    <section id="packages" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading
          tone="slate"
          eyebrow="Plan Your Spiti Journey"
          title="Popular Spiti Valley Tour Packages"
          description="Choose a ready-made Spiti itinerary or customise the route around your dates, vehicle, pace and travel style."
        />

        <PackageExplorer
          packages={cards}
          tripTypes={spitiTripTypes}
          durations={spitiDurations}
          budgets={spitiBudgets}
          placeName="Spiti"
          idPrefix="sp"
          detailsLabel="View Package"
          priceNote="per person, based on twin sharing"
          customCard={customCard()}
          emptyMessage="Most Spiti trips we plan end up built around the traveller anyway — tell us your dates, starting point and group size and we will put a route together."
        />

        <p className="mt-6 text-xs text-ink-600/60">
          Routes over Kunzum Pass and to Chandratal depend on seasonal road conditions and the
          roads being declared open. We confirm the route against the latest conditions before you
          travel.
        </p>
      </Container>
    </section>
  );
}
