import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarRange, MessageCircle, ArrowRight } from "lucide-react";
import { searchPackages } from "@/lib/api/packages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatINR } from "@/lib/utils";
import { whatsappLink } from "@/lib/seo";
import type { Package } from "@/lib/types";

/**
 * Prices are read live from data/packages.ts — never duplicated here, so the
 * team can change a figure in one place and every surface follows.
 */
function PackageCard({ pkg, priority }: { pkg: Package; priority?: boolean }) {
  const wa = whatsappLink(
    `Hi TheTravelKart, I'd like to enquire about the "${pkg.title}" Himachal package (${pkg.durationNights} nights / ${pkg.durationDays} days).`
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        {/* REPLACE: package photography */}
        <Image
          src={pkg.image}
          alt={`${pkg.title} — ${pkg.routeCities.join(", ")}`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 88vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-ink-900 backdrop-blur-sm">
          <CalendarRange className="h-3 w-3" aria-hidden="true" />
          {pkg.durationNights}N / {pkg.durationDays}D
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-brand-700">{pkg.title}</Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-ink-700">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{pkg.routeCities.join(" • ")}</span>
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600/80">{pkg.summary}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold text-ink-900">
              {formatINR(pkg.price)}
            </span>
            {pkg.strikeThroughPrice && (
              <span className="text-xs text-ink-600/50 line-through">
                {formatINR(pkg.strikeThroughPrice)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-ink-600/55">per person, on twin sharing</p>

          <div className="mt-4 flex gap-2">
            <Link
              href={`/packages/${pkg.slug}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${pkg.title} on WhatsApp`}
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1da851]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HimachalPackages() {
  const packages = searchPackages({ regionSlug: "himachal", sort: "popular" });

  return (
    <section id="packages" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Popular right now"
            title="Popular Himachal Tour Packages"
            description="Handpicked Himachal holidays for couples, families and groups — every one of them customizable."
          />
          <Link href="/packages?region=himachal" className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800">
            Compare all {packages.length} packages →
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} priority={i < 3} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-sand-200 bg-sand-50 p-6 text-center">
          <p className="font-display text-lg font-bold text-ink-900">
            None of these quite right?
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-ink-600/75">
            Most of the trips we run are built from scratch. Tell us your dates and budget and we
            will put a real itinerary together, usually within a working day.
          </p>
          <Link
            href="#enquiry"
            className="mt-4 inline-block rounded-full bg-sunset-500 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-sunset-600"
          >
            Talk to a Travel Expert
          </Link>
        </div>
      </Container>
    </section>
  );
}
