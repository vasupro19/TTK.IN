import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listFeaturedRegions } from "@/lib/api/catalogue";
import { listDestinations } from "@/lib/api/catalogue";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

export function TrendingDestinations() {
  const regions = listFeaturedRegions(9);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Where India takes you"
            title="Where India Takes You"
            description="Explore our most-loved destinations — each one with its own towns, stays and ready itineraries."
          />
          <Link
            href="/destinations"
            className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            All destinations →
          </Link>
        </div>

        <div className="mt-9 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {regions.map((region, i) => {
            const towns = listDestinations(region.slug);
            return (
              <div key={region.slug} className="w-[82vw] shrink-0 snap-start sm:w-auto">
                <Reveal delay={i * 50}>
                  <Link
                    href={region.seoPath ?? `/destinations/${region.slug}`}
                    className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <SmartImage
                      seed={region.imageSeed}
                      priority={i < 3}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 82vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/30 to-transparent" />

                    <div className="relative p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                        {region.area}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white">
                        {region.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/75">
                        {region.tagline}
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs text-white/60">
                            {towns.length} destinations · from
                          </p>
                          <p className="font-display text-lg font-extrabold text-white">
                            {formatINR(region.startingPrice)}
                          </p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-900 transition-colors group-hover:bg-sunset-500 group-hover:text-white">
                          Explore
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
