import { packages } from "@/lib/data/packages";
import { destinations } from "@/lib/data/destinations";
import { regions } from "@/lib/data/regions";
import type {
  HotelCategory,
  MealPlan,
  Package,
  PackageCategory,
  PackageType,
  TransportMode,
} from "@/lib/types";

/**
 * Marketplace query contract.
 *
 * Everything the listing page can filter or sort by lives here. Today it runs
 * against the in-memory catalogue; swapping `searchPackages` for a Prisma or
 * REST call means changing this file only — callers keep the same shape.
 */
export interface PackageQuery {
  /** Free-text: matches title, route cities, destination and region names. */
  q?: string;
  regionSlug?: string;
  destinationSlug?: string;
  categories?: PackageCategory[];
  type?: PackageType;
  minPrice?: number;
  maxPrice?: number;
  /** Inclusive day range, e.g. { min: 4, max: 6 }. */
  durationMin?: number;
  durationMax?: number;
  hotelCategories?: HotelCategory[];
  meals?: MealPlan[];
  transport?: TransportMode[];
  departureCity?: string;
  minRating?: number;
  sort?: PackageSort;
}

export type PackageSort = "popular" | "price-asc" | "price-desc" | "duration" | "rating";

export const PACKAGE_SORTS: { value: PackageSort; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "duration", label: "Duration" },
  { value: "rating", label: "Rating" },
];

function haystack(pkg: Package): string {
  const destNames = pkg.destinationSlugs
    .map((slug) => destinations.find((d) => d.slug === slug)?.name ?? "")
    .join(" ");
  const regionName = regions.find((r) => r.slug === pkg.regionSlug)?.name ?? "";
  return [pkg.title, pkg.routeCities.join(" "), destNames, regionName, pkg.summary]
    .join(" ")
    .toLowerCase();
}

/**
 * A destination filter usually names a destination ("manali"), but links and
 * shared URLs routinely carry a region instead ("himachal"). Accept either,
 * rather than returning an empty result page for a slug the site itself uses.
 */
function matchesDestination(pkg: Package, slug: string): boolean {
  if (pkg.destinationSlugs.includes(slug)) return true;
  const isRegion = regions.some((r) => r.slug === slug);
  return isRegion && pkg.regionSlug === slug;
}

function sortPackages(list: Package[], sort: PackageSort = "popular"): Package[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "duration":
      return sorted.sort((a, b) => a.durationDays - b.durationDays);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    default:
      return sorted.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.reviewCount - a.reviewCount
      );
  }
}

export function searchPackages(query: PackageQuery = {}): Package[] {
  const term = query.q?.trim().toLowerCase();

  const filtered = packages.filter((pkg) => {
    if (term && !haystack(pkg).includes(term)) return false;
    if (query.regionSlug && pkg.regionSlug !== query.regionSlug) return false;
    if (query.destinationSlug && !matchesDestination(pkg, query.destinationSlug)) return false;
    if (query.type && pkg.type !== query.type) return false;
    if (query.categories?.length && !query.categories.some((c) => pkg.categories.includes(c)))
      return false;
    if (query.minPrice !== undefined && pkg.price < query.minPrice) return false;
    if (query.maxPrice !== undefined && pkg.price > query.maxPrice) return false;
    if (query.durationMin !== undefined && pkg.durationDays < query.durationMin) return false;
    if (query.durationMax !== undefined && pkg.durationDays > query.durationMax) return false;
    if (query.hotelCategories?.length && !query.hotelCategories.includes(pkg.hotelCategory))
      return false;
    if (query.meals?.length && !query.meals.includes(pkg.meals)) return false;
    if (query.transport?.length && !query.transport.includes(pkg.transport)) return false;
    if (
      query.departureCity &&
      !pkg.departureCities.some((c) => c.toLowerCase() === query.departureCity!.toLowerCase())
    )
      return false;
    if (query.minRating !== undefined && pkg.rating < query.minRating) return false;
    return true;
  });

  return sortPackages(filtered, query.sort);
}

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

export function listFeaturedPackages(limit = 6): Package[] {
  return packages.filter((p) => p.featured).slice(0, limit);
}

/** Every departure city in the catalogue, for the filter panel. */
export function listDepartureCities(): string[] {
  return Array.from(new Set(packages.flatMap((p) => p.departureCities))).sort();
}

export function priceBounds(): { min: number; max: number } {
  const prices = packages.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getRelatedPackages(pkg: Package, limit = 3): Package[] {
  const others = packages.filter((p) => p.slug !== pkg.slug);
  const ranked = [
    ...others.filter((p) => p.destinationSlug === pkg.destinationSlug),
    ...others.filter((p) => p.destinationSlug !== pkg.destinationSlug && p.regionSlug === pkg.regionSlug),
    ...others.filter((p) => p.regionSlug !== pkg.regionSlug && p.type === pkg.type),
  ];
  return Array.from(new Set(ranked)).slice(0, limit);
}
