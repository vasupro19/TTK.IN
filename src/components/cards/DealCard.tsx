import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Deal } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

export function DealCard({ deal, priority = false }: { deal: Deal; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          seed={deal.imageSeed}
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {deal.discountPercent}% off
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-ink-900">{deal.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-600/70">{deal.blurb}</p>

        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-ink-600/65">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {deal.durationLabel}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-xs text-ink-600/55">From</p>
            <p className="font-display text-xl font-extrabold text-ink-900">
              {formatINR(deal.price)}
            </p>
            <p className="text-xs text-ink-600/50">
              <span className="line-through">{formatINR(deal.strikeThroughPrice)}</span> / person
            </p>
          </div>
          <Link
            href={`/packages/${deal.packageSlug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Explore
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
