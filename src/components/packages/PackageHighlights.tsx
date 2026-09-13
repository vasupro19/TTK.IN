import {
  Mountain,
  BedDouble,
  Car,
  Utensils,
  Camera,
  Headset,
  type LucideIcon,
} from "lucide-react";
import type { Package } from "@/lib/types";
import { hotelLabel, mealLabels, transportLabels } from "@/lib/labels";

interface Highlight {
  icon: LucideIcon;
  title: string;
  detail: string;
}

export function PackageHighlights({ pkg }: { pkg: Package }) {
  const items: Highlight[] = [
    {
      icon: Mountain,
      title: pkg.type === "domestic" ? "Signature scenery" : "Signature sights",
      detail: pkg.routeCities.join(" • "),
    },
    { icon: BedDouble, title: "Handpicked stays", detail: hotelLabel(pkg.hotelCategory) },
    { icon: Car, title: "Transfers", detail: transportLabels[pkg.transport] },
    { icon: Utensils, title: "Meals", detail: mealLabels[pkg.meals] },
    {
      icon: Camera,
      title: "Sightseeing",
      detail: pkg.sightseeing ? "Included as per itinerary" : "Available as an add-on",
    },
    { icon: Headset, title: "24/7 support", detail: "A coordinator on WhatsApp throughout" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, detail }) => (
        <div
          key={title}
          className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-ink-900">{title}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-ink-600/75">{detail}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
