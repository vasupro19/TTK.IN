import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listDestinations } from "@/lib/api/catalogue";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HimachalDestinations() {
  const destinations = listDestinations("himachal");

  return (
    <section id="destinations" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Where to go"
            title="Explore Himachal Pradesh"
            description="Twelve towns and valleys we run trips to — from the Mall Road crowds to villages most itineraries never reach."
          />
          <Link href="/destinations/himachal" className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800">
            All destinations →
          </Link>
        </div>

        {/* Horizontal rail on phones, grid from tablet up. */}
        <div className="mt-9 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination, i) => (
            <div key={destination.slug} className="w-[68vw] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/destinations/${destination.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* REPLACE: destination photography */}
                <Image
                  src={destination.image}
                  alt={`${destination.name}, Himachal Pradesh`}
                  fill
                  loading={i < 4 ? undefined : "lazy"}
                  priority={i < 2}
                  sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 68vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/25 to-transparent" />
                <div className="relative p-4">
                  <h3 className="font-display text-lg font-bold text-white">{destination.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75">
                    {destination.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
