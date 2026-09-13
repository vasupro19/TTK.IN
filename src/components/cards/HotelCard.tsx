import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble } from "lucide-react";
import type { Hotel } from "@/lib/types";
import { getDestination } from "@/lib/api/catalogue";
import { formatINR } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

export function HotelCard({ hotel, priority = false }: { hotel: Hotel; priority?: boolean }) {
  const destination = getDestination(hotel.destinationSlug);
  const baseRoom = hotel.rooms[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-xs font-bold text-ink-900 backdrop-blur-sm">
          {hotel.starRating}★
        </span>
        <span className="absolute right-3 top-3">
          <StarRating rating={hotel.rating} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold leading-snug text-ink-900">{hotel.name}</h3>
        {destination && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-600/70">
            <MapPin className="h-3.5 w-3.5 text-ink-600/45" aria-hidden="true" />
            {destination.name}
          </p>
        )}

        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-ink-600/75">
          {hotel.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-sand-100 px-2 py-0.5 text-[11px] text-ink-700"
            >
              {amenity}
            </span>
          ))}
        </div>

        {baseRoom && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-700">
            <BedDouble className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            {baseRoom.name} · {baseRoom.occupancy}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-sand-200 pt-3.5">
          <div>
            <span className="font-display text-lg font-extrabold text-ink-900">
              {formatINR(baseRoom?.pricePerNight ?? hotel.pricePerNight)}
            </span>
            <span className="text-xs text-ink-600/60"> / night</span>
            {baseRoom && (
              <p className="text-[11px] text-ink-600/55">
                + {formatINR(baseRoom.taxesPerNight)} taxes &amp; fees
              </p>
            )}
          </div>
          <Link
            href={`/plan-my-trip?destination=${hotel.destinationSlug}`}
            className="shrink-0 rounded-full bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
