import Link from "next/link";
import { listFeaturedPackages } from "@/lib/api/packages";
import { PackageCard } from "@/components/cards/PackageCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedPackages() {
  const packages = listFeaturedPackages(6);

  return (
    <section className="bg-sand-50 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Trips made for you"
            title="Trips Made for You"
            description="Itineraries we run often enough to know exactly how they feel on the ground."
          />
          <Link
            href="/packages"
            className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Browse all packages →
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 50}>
              <PackageCard pkg={pkg} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
