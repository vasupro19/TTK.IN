import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function DestinationCard({
  destination,
  priority = false,
}: {
  destination: Destination;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex aspect-[3/4] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />
      <div className="relative mt-auto p-4 text-white">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">
          {destination.country}
        </p>
        <h3 className="mt-1 text-lg font-bold">{destination.name}</h3>
        <p className="mt-1 text-xs text-white/80">
          From <span className="font-semibold">{formatINR(destination.startingPrice)}</span>
        </p>
      </div>
    </Link>
  );
}
