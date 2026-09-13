import type { PackageQuery, PackageSort } from "@/lib/api/packages";
import type { ActiveFilters } from "@/components/packages/PackageFilters";
import type {
  HotelCategory,
  MealPlan,
  PackageCategory,
  PackageType,
  TransportMode,
} from "@/lib/types";

export type RawSearchParams = { [key: string]: string | string[] | undefined };

function one(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? (value[0] ?? "") : value;
}

function many(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

/** "25000-50000" → [25000, 50000]; a trailing 0 means "no upper bound". */
function parseBand(band: string): { min?: number; max?: number } {
  if (!band) return {};
  const [rawMin, rawMax] = band.split("-").map((n) => Number(n));
  const min = Number.isFinite(rawMin) && rawMin > 0 ? rawMin : undefined;
  const max = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : undefined;
  return { min, max };
}

/**
 * Single source of truth for translating URL parameters into a `PackageQuery`
 * and back into the checkbox state the filter panel renders.
 */
export function parsePackageParams(params: RawSearchParams): {
  query: PackageQuery;
  active: ActiveFilters;
  sort: PackageSort;
} {
  const q = one(params.q);
  const region = one(params.region);
  const destination = one(params.destination);
  const categories = many(params.category);
  const type = one(params.type);
  // The hero search sends `budget`; the filter panel sends `price`.
  const price = one(params.price) || one(params.budget);
  const duration = one(params.duration);
  const hotel = many(params.hotel);
  const meals = many(params.meals);
  const transport = many(params.transport);
  // The hero search sends `from`; keep `departure` as an alias.
  const from = one(params.from) || one(params.departure);
  const rating = one(params.rating);
  const sortParam = one(params.sort);

  const sort: PackageSort = (
    ["popular", "price-asc", "price-desc", "duration", "rating"] as const
  ).includes(sortParam as PackageSort)
    ? (sortParam as PackageSort)
    : "popular";

  const priceBand = parseBand(price);
  const durationBand = parseBand(duration);

  const query: PackageQuery = {
    q: q || undefined,
    regionSlug: region || undefined,
    destinationSlug: destination || undefined,
    categories: categories.length ? (categories as PackageCategory[]) : undefined,
    type: type ? (type as PackageType) : undefined,
    minPrice: priceBand.min,
    maxPrice: priceBand.max,
    durationMin: durationBand.min,
    durationMax: durationBand.max,
    hotelCategories: hotel.length
      ? (hotel.map(Number).filter((n) => [3, 4, 5].includes(n)) as HotelCategory[])
      : undefined,
    meals: meals.length ? (meals as MealPlan[]) : undefined,
    transport: transport.length ? (transport as TransportMode[]) : undefined,
    departureCity: from || undefined,
    minRating: rating ? Number(rating) : undefined,
    sort,
  };

  const active: ActiveFilters = {
    q,
    region,
    destination,
    categories,
    type,
    price,
    duration,
    hotel,
    meals,
    transport,
    from,
    rating,
  };

  return { query, active, sort };
}

/** Rebuilds the current URL with one parameter replaced — used by the sort control. */
export function buildPackageHref(
  active: ActiveFilters,
  overrides: { sort?: string } = {}
): string {
  const search = new URLSearchParams();
  if (active.q) search.set("q", active.q);
  if (active.region) search.set("region", active.region);
  if (active.destination) search.set("destination", active.destination);
  active.categories.forEach((c) => search.append("category", c));
  if (active.type) search.set("type", active.type);
  if (active.price) search.set("price", active.price);
  if (active.duration) search.set("duration", active.duration);
  active.hotel.forEach((h) => search.append("hotel", h));
  active.meals.forEach((m) => search.append("meals", m));
  active.transport.forEach((t) => search.append("transport", t));
  if (active.from) search.set("from", active.from);
  if (active.rating) search.set("rating", active.rating);
  if (overrides.sort) search.set("sort", overrides.sort);

  const qs = search.toString();
  return qs ? `/packages?${qs}` : "/packages";
}

/** Human-readable chips describing what is currently filtered. */
export function activeFilterCount(active: ActiveFilters): number {
  return (
    (active.region ? 1 : 0) +
    (active.destination ? 1 : 0) +
    active.categories.length +
    (active.type ? 1 : 0) +
    (active.price ? 1 : 0) +
    (active.duration ? 1 : 0) +
    active.hotel.length +
    active.meals.length +
    active.transport.length +
    (active.from ? 1 : 0) +
    (active.rating ? 1 : 0)
  );
}
