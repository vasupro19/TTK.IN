import type { Activity } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";

export function ActivityCard({ activity, priority = false }: { activity: Activity; priority?: boolean }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SmartImage
          seed={activity.imageSeed}
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="sunset">{activity.category}</Badge>
          <StarRating rating={activity.rating} />
        </div>
        <h3 className="text-sm font-bold leading-snug text-ink-900">{activity.name}</h3>
        <p className="line-clamp-2 text-xs text-ink-600/75">{activity.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-sand-200 pt-3">
          <span className="text-base font-extrabold text-ink-900">{formatINR(activity.price)}</span>
          <span className="text-xs text-ink-600/60">{activity.durationHours}h duration</span>
        </div>
      </div>
    </div>
  );
}
