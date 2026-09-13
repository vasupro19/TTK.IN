import Link from "next/link";
import { PACKAGE_SORTS } from "@/lib/api/packages";
import { cn } from "@/lib/utils";

export function SortLinks({
  currentSort,
  buildHref,
}: {
  currentSort: string;
  buildHref: (sort: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-600/55">Sort</span>
      {PACKAGE_SORTS.map((option) => (
        <Link
          key={option.value}
          href={buildHref(option.value)}
          aria-current={currentSort === option.value ? "true" : undefined}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
            currentSort === option.value
              ? "bg-brand-700 text-white"
              : "bg-sand-100 text-ink-700 hover:bg-sand-200"
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
