import { regions } from "@/lib/data/regions";
import { destinations } from "@/lib/data/destinations";
import { hotels } from "@/lib/data/hotels";
import { activities } from "@/lib/data/activities";
import { testimonials } from "@/lib/data/testimonials";
import { packages } from "@/lib/data/packages";
import type { Destination, Hotel, Region, Review } from "@/lib/types";

/**
 * Read-side accessors for the catalogue. Components import from here rather
 * than reaching into `lib/data` directly, so the mock arrays can be replaced
 * with database queries without touching the UI.
 */

export function listRegions(type?: "domestic" | "international"): Region[] {
  return type ? regions.filter((r) => r.type === type) : regions;
}

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function listFeaturedRegions(limit = 9): Region[] {
  return [...regions]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, limit);
}

export function listDestinations(regionSlug?: string): Destination[] {
  return regionSlug ? destinations.filter((d) => d.regionSlug === regionSlug) : destinations;
}

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function listHotels(destinationSlug?: string): Hotel[] {
  return destinationSlug ? hotels.filter((h) => h.destinationSlug === destinationSlug) : hotels;
}

export function getHotel(slug: string): Hotel | undefined {
  return hotels.find((h) => h.slug === slug);
}

export function listActivities(destinationSlug?: string) {
  return destinationSlug
    ? activities.filter((a) => a.destinationSlug === destinationSlug)
    : activities;
}

/**
 * Published reviews. Sourced from the mock testimonials today; when the CRM
 * review pipeline lands, this becomes the only thing that changes — the
 * `Review` shape and the `published` gate already match.
 */
export function listPublishedReviews(limit?: number): Review[] {
  const mapped: Review[] = testimonials.map((t, i) => ({
    id: `rev_${i + 1}`,
    customerName: t.name,
    location: t.location,
    packageSlug: t.packageSlug,
    rating: t.rating,
    body: t.quote,
    travelledOn: t.travelledOn ?? "",
    published: true,
    createdAt: "",
  }));
  return limit ? mapped.slice(0, limit) : mapped;
}

/** Aggregate rating across the catalogue, for the social-proof band. */
export function catalogueStats() {
  const rated = packages.filter((p) => p.reviewCount > 0);
  const reviewCount = rated.reduce((sum, p) => sum + p.reviewCount, 0);
  const weighted = rated.reduce((sum, p) => sum + p.rating * p.reviewCount, 0);
  return {
    averageRating: Number((weighted / reviewCount).toFixed(1)),
    reviewCount,
    packageCount: packages.length,
    destinationCount: destinations.length,
    regionCount: regions.length,
  };
}
