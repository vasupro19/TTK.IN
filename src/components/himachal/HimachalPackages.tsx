import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import {
  HimachalPackageExplorer,
  type PackageCardData,
} from "./HimachalPackageExplorer";
import { himachalLandingSlugs } from "@/lib/data/himachal";
import { packages as allPackages } from "@/lib/data/packages";
import { image } from "@/lib/images";
import { whatsappLink } from "@/lib/seo";

/**
 * The ten itineraries the landing page sells.
 *
 * Prices and content come from data/packages.ts — never restated here — and
 * the order is the editorial one in himachalLandingSlugs. Images are resolved
 * here, on the server, so the filter UI stays a small client bundle.
 */
export function HimachalPackages() {
  const cards: PackageCardData[] = himachalLandingSlugs
    .map((slug) => allPackages.find((pkg) => pkg.slug === slug))
    .filter((pkg): pkg is NonNullable<typeof pkg> => Boolean(pkg))
    .map((pkg) => {
      const resolved = image(pkg.imageSeed);
      return {
        slug: pkg.slug,
        title: pkg.title,
        route: pkg.routeCities,
        nights: pkg.durationNights,
        days: pkg.durationDays,
        price: pkg.price,
        strikeThroughPrice: pkg.strikeThroughPrice,
        hotelCategory: pkg.hotelCategory,
        summary: pkg.summary,
        categories: pkg.categories,
        featured: Boolean(pkg.featured),
        imageSrc: resolved.src,
        imageAlt: resolved.alt,
        whatsappHref: whatsappLink(
          `Hi TheTravelKart, I'd like to enquire about the "${pkg.title}" package (${pkg.durationNights} nights / ${pkg.durationDays} days).`,
        ),
      };
    });

  return (
    <section id="packages" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Popular right now"
          title="Popular Himachal Tour Packages"
          description="Choose a ready-made itinerary or customise any of them around your dates, budget and pace."
        />

        <HimachalPackageExplorer packages={cards} />

        <div className="mt-10 rounded-2xl border border-dashed border-sand-200 bg-sand-50 p-6 text-center">
          <p className="font-display text-lg font-bold text-ink-900">
            Can&apos;t find the perfect package?
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-ink-600/75">
            Tell us what you have in mind and we&apos;ll build a Himachal itinerary around your
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
