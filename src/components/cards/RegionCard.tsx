import Link from "next/link";
import type { Region } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

export function RegionCard({
  region,
  destinationCount,
  packageCount,
  priority = false,
}: {
  region: Region;
  destinationCount: number;
  packageCount: number;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${region.slug}`}
      className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <SmartImage
        seed={region.imageSeed}
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent" />
      <div className="relative mt-auto w-full p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">{region.area}</p>
        <h3 className="mt-1 text-xl font-bold">{region.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-white/80">{region.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85">
          <span>{destinationCount} destinations</span>
          <span aria-hidden className="text-white/40">
            •
          </span>
          <span>
            {packageCount} package{packageCount !== 1 ? "s" : ""}
          </span>
          <span aria-hidden className="text-white/40">
            •
          </span>
          <span>
            From <span className="font-semibold">{formatINR(region.startingPrice)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
