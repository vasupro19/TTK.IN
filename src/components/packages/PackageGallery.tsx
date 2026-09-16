"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { imageAlt } from "@/lib/images";

/**
 * Gallery for a package. Takes image *seeds* — one per place the itinerary
 * actually visits — so a Shimla–Manali trip shows Shimla and Manali rather
 * than four interchangeable mountain photographs.
 */
export function PackageGallery({ seeds, title }: { seeds: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (seeds.length === 0) return null;

  const active = seeds[Math.min(activeIndex, seeds.length - 1)];

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-100 sm:aspect-[16/9]">
        <SmartImage
          seed={active}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>

      {seeds.length > 1 && (
        <div
          role="tablist"
          aria-label={`${title} photo gallery`}
          className="mt-3 flex gap-2.5 overflow-x-auto pb-1"
        >
          {seeds.map((seed, i) => (
            <button
              key={seed}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              // The thumbnail says where it goes, not "photo 3 of 5".
              aria-label={imageAlt(seed)}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition-all sm:h-20 sm:w-28",
                i === activeIndex
                  ? "ring-brand-600"
                  : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <SmartImage seed={seed} alt="" sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
