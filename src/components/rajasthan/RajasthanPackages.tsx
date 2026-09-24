import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { PackageExplorer, type PackageCardData } from "@/components/landing/PackageExplorer";
import {
  rajasthanDurations,
  rajasthanLandingPackages,
  rajasthanTripTypes,
} from "@/lib/data/rajasthan";
import { packages as allPackages } from "@/lib/data/packages";
import { image } from "@/lib/images";
import { whatsappLink } from "@/lib/seo";

/** Cards for the landing page, resolved on the server (see PackageExplorer). */
export function rajasthanPackageCards(): PackageCardData[] {
  return rajasthanLandingPackages.flatMap((entry) => {
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
        imageSrc: resolved.src,
        imageAlt: resolved.alt,
        whatsappHref: whatsappLink(
          `Hi TheTravelKart, I'd like to enquire about the "${pkg.title}" Rajasthan package (${pkg.durationNights} nights / ${pkg.durationDays} days).`,
        ),
      },
    ];
  });
}

export function RajasthanPackages({ cards }: { cards: PackageCardData[] }) {
  return (
    <section id="packages" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading
          tone="desert"
          eyebrow="Popular right now"
          title="Popular Rajasthan Tour Packages"
          description="Choose a ready-made Rajasthan itinerary or customise it around your dates, budget and travel style."
        />

        <PackageExplorer
          packages={cards}
          tripTypes={rajasthanTripTypes}
          durations={rajasthanDurations}
          placeName="Rajasthan"
          idPrefix="rj"
          emptyMessage="Most Rajasthan trips we plan are shaped around the traveller anyway — tell us your dates and budget and we will put an itinerary together."
        />

        <div className="mt-10 rounded-2xl border border-dashed border-sandstone-300 bg-sandstone-50 p-6 text-center">
          <p className="font-display text-lg font-bold text-ink-900">
            Can&apos;t find the perfect Rajasthan package?
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-ink-600/75">
            Tell us what you have in mind and we&apos;ll build a Rajasthan itinerary around your
            dates, budget and travel style.
          </p>
          <EnquiryButton className="mt-4 inline-block rounded-full bg-sunset-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-sunset-600">
            Build My Trip
          </EnquiryButton>
        </div>
      </Container>
    </section>
  );
}
