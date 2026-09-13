import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import type { TravelCategory } from "@/lib/types";

/** Resolves the category's Lucide icon name to a component, with a safe fallback. */
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Resolved = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ];
  const Fallback = Icons.Compass;
  const Component = Resolved ?? Fallback;
  return <Component className={className} />;
}

export function CategoryCard({
  category,
  priority = false,
}: {
  category: TravelCategory;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/packages?category=${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:aspect-[5/6]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 60vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/92 via-ink-900/35 to-ink-900/5" />

      <div className="relative p-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
          <CategoryIcon name={category.icon} className="h-4 w-4" />
        </span>
        <h3 className="mt-3 font-display text-base font-bold text-white">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
          {category.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
          Explore
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
