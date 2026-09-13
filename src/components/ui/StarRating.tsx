import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 rounded-md bg-brand-700 px-1.5 py-0.5 text-xs font-bold text-white">
        {rating.toFixed(1)}
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.8l-5.21 2.72 1-5.8-4.21-4.1 5.82-.85z" />
        </svg>
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs font-medium text-ink-600/70">
          ({reviewCount.toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
}
