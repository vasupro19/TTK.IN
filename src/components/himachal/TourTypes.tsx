import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tourTypes } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function TourTypes() {
  return (
    <section className="bg-sand-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Trip types"
          title="Find a Himachal Trip That Fits You"
          description="The same valleys, planned very differently depending on who is travelling."
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tourTypes.map((type) => (
            <Link
              key={type.slug}
              href={type.href}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:aspect-[5/6]"
            >
              {/* REPLACE: trip-type photography */}
              <SmartImage
                seed={type.imageSeed}
                loading="lazy"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/35 to-ink-900/5" />
              <div className="relative p-4">
                <h3 className="font-display text-base font-bold text-white">{type.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">{type.blurb}</p>
                <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
