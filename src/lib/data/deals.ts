import { packages } from "@/lib/data/packages";
import { regions } from "@/lib/data/regions";
import type { Deal } from "@/lib/types";

/**
 * Deals are curated by package slug rather than by copying prices, so a price
 * change in `packages.ts` (or later, the database) flows through automatically.
 * `validTill` is the only editorial field.
 */
const curated: { packageSlug: string; validTill: string; blurb: string }[] = [
  {
    packageSlug: "shimla-manali-mountain-escape-6d",
    validTill: "2026-11-30",
    blurb: "Both hill stations, one drive, off-season rates.",
  },
  {
    packageSlug: "manali-kasol-jibhi-adventure-6d",
    validTill: "2026-11-30",
    blurb: "Three valleys on overnight Volvo departures from Delhi.",
  },
  {
    packageSlug: "srinagar-sonmarg-family-5d",
    validTill: "2026-10-31",
    blurb: "Houseboat nights and a full day at Thajiwas glacier.",
  },
  {
    packageSlug: "munnar-thekkady-alleppey-serenity-5d",
    validTill: "2026-12-15",
    blurb: "Tea hills, Periyar and a private houseboat night.",
  },
  {
    packageSlug: "rajasthan-desert-trail-6d",
    validTill: "2026-12-31",
    blurb: "Four cities and a Sam dunes camp in the cool season.",
  },
  {
    packageSlug: "leh-ladakh-circuit-7d",
    validTill: "2026-09-30",
    blurb: "Last departures before the passes close for winter.",
  },
  {
    packageSlug: "port-blair-havelock-neil-7d",
    validTill: "2026-12-20",
    blurb: "Three islands, premium ferries, six nights.",
  },
  {
    packageSlug: "thailand-phuket-krabi-islands-6d",
    validTill: "2026-11-15",
    blurb: "Phi Phi and the four-island tour in one trip.",
  },
];

export const deals: Deal[] = curated
  .map(({ packageSlug, validTill, blurb }): Deal | null => {
    const pkg = packages.find((p) => p.slug === packageSlug);
    if (!pkg || !pkg.strikeThroughPrice) return null;
    const region = regions.find((r) => r.slug === pkg.regionSlug);

    return {
      slug: `deal-${pkg.slug}`,
      title: pkg.title,
      regionSlug: pkg.regionSlug,
      packageSlug: pkg.slug,
      discountPercent: Math.round(
        ((pkg.strikeThroughPrice - pkg.price) / pkg.strikeThroughPrice) * 100
      ),
      price: pkg.price,
      strikeThroughPrice: pkg.strikeThroughPrice,
      durationLabel: `${pkg.durationNights} Nights / ${pkg.durationDays} Days`,
      image: pkg.image,
      validTill,
      blurb: blurb || region?.tagline || pkg.summary,
    };
  })
  .filter((d): d is Deal => d !== null)
  .sort((a, b) => b.discountPercent - a.discountPercent);

export function getFeaturedDeals(limit = 4): Deal[] {
  return deals.slice(0, limit);
}
