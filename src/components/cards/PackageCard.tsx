import Link from "next/link";
import { BedDouble, Utensils, Car, Camera, CalendarRange, MapPin } from "lucide-react";
import type { Package } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import {
  categoryLabels,
  mealLabels,
  transportLabels,
  hotelLabel,
  shortDurationLabel,
} from "@/lib/labels";
import { SmartImage } from "@/components/ui/SmartImage";

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-ink-700">
      <span className="text-brand-600">{icon}</span>
      {label}
    </span>
  );
}

export function PackageCard({ pkg, priority = false }: { pkg: Package; priority?: boolean }) {
  const discount = pkg.strikeThroughPrice
    ? Math.round(((pkg.strikeThroughPrice - pkg.price) / pkg.strikeThroughPrice) * 100)
    : null;
  const totalForTwo = pkg.price * 2;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-black/10">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <SmartImage
          seed={pkg.imageSeed}
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-900/70 to-transparent" />
        {discount !== null && discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-sunset-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            {discount}% off
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-ink-900 backdrop-blur-sm">
          <CalendarRange className="h-3 w-3" aria-hidden="true" />
          {shortDurationLabel(pkg.durationDays, pkg.durationNights)}
        </span>
        <span className="absolute bottom-3 left-3">
          <StarRating rating={pkg.rating} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold leading-snug text-ink-900">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-brand-700">
            {pkg.title}
          </Link>
        </h3>

        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-ink-600/75">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-600/50" aria-hidden="true" />
          <span className="line-clamp-1">{pkg.routeCities.join(" • ")}</span>
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 rounded-xl bg-sand-50 p-3">
          <Feature icon={<BedDouble className="h-3.5 w-3.5" />} label={hotelLabel(pkg.hotelCategory)} />
          <Feature icon={<Utensils className="h-3.5 w-3.5" />} label={mealLabels[pkg.meals]} />
          <Feature icon={<Car className="h-3.5 w-3.5" />} label={transportLabels[pkg.transport]} />
          {pkg.sightseeing && (
            <Feature icon={<Camera className="h-3.5 w-3.5" />} label="Sightseeing" />
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700"
            >
              {categoryLabels[c]}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-sand-200 pt-3.5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-extrabold text-ink-900">
                {formatINR(pkg.price)}
              </span>
              {pkg.strikeThroughPrice && (
                <span className="text-xs text-ink-600/50 line-through">
                  {formatINR(pkg.strikeThroughPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-ink-600/55">
              per person · {formatINR(totalForTwo)} for 2
            </p>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="shrink-0 rounded-full bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
