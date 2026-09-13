"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PackageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shots = images.length > 0 ? images : [];
  if (shots.length === 0) return null;

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-100 sm:aspect-[16/9]">
        <Image
          src={shots[activeIndex]}
          alt={`${title} — photo ${activeIndex + 1} of ${shots.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>

      {shots.length > 1 && (
        <div
          role="tablist"
          aria-label={`${title} photo gallery`}
          className="mt-3 flex gap-2.5 overflow-x-auto pb-1"
        >
          {shots.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition-all sm:h-20 sm:w-28",
                i === activeIndex
                  ? "ring-brand-600"
                  : "opacity-70 ring-transparent hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
