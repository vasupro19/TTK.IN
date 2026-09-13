import { photo } from "@/lib/images";
import type { TravelCategory } from "@/lib/types";

/**
 * Trip types used by the marketplace filters, the homepage category rails and
 * the `/packages?category=` query. Slugs match `PackageCategory`.
 */
export const travelCategories: TravelCategory[] = [
  {
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Private transfers, a room worth waking up in, and space to do nothing.",
    image: photo("cat-honeymoon"),
    icon: "Heart",
  },
  {
    slug: "family",
    name: "Family Holidays",
    description: "Paced for grandparents and toddlers alike, with rooms close together.",
    image: photo("cat-family"),
    icon: "Users",
  },
  {
    slug: "group",
    name: "Group Tours",
    description: "Ten to fifty travellers, one coordinator, and per-head pricing that drops.",
    image: photo("cat-group"),
    icon: "UsersRound",
  },
  {
    slug: "adventure",
    name: "Adventure Trips",
    description: "Passes, rapids, ridgelines — with guides who have done the route before.",
    image: photo("cat-adventure"),
    icon: "Mountain",
  },
  {
    slug: "luxury",
    name: "Luxury Holidays",
    description: "Five-star stays, private guides and the good rooms, not the leftover ones.",
    image: photo("cat-luxury"),
    icon: "Gem",
  },
  {
    slug: "weekend",
    name: "Weekend Getaways",
    description: "Two or three nights, close to home, planned in a single phone call.",
    image: photo("cat-weekend"),
    icon: "CalendarDays",
  },
  {
    slug: "pilgrimage",
    name: "Pilgrimage",
    description: "Darshan timings, temple assistance and stays within walking distance.",
    image: photo("cat-pilgrimage"),
    icon: "Landmark",
  },
  {
    slug: "corporate",
    name: "Corporate Travel",
    description: "Offsites and incentive trips with GST invoices and a single point of contact.",
    image: photo("cat-corporate"),
    icon: "Briefcase",
  },
];

/** The six shown in the homepage hero rail. */
export const quickCategories = travelCategories.filter((c) =>
  ["honeymoon", "family", "group", "adventure", "luxury", "weekend"].includes(c.slug)
);

/** The six shown in the deeper "browse by trip type" section. */
export const tripTypeCategories = travelCategories.filter((c) =>
  ["adventure", "family", "honeymoon", "pilgrimage", "luxury", "corporate"].includes(c.slug)
);

export function getCategoryBySlug(slug: string): TravelCategory | undefined {
  return travelCategories.find((c) => c.slug === slug);
}
