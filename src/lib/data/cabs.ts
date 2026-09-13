import { photo } from "@/lib/images";
import type { CabOption } from "@/lib/types";

export const cabOptions: CabOption[] = [
  {
    type: "hatchback",
    name: "Hatchback (AC)",
    capacity: "Up to 3 passengers",
    pricePerKm: 11,
    image: photo("cab-hatchback"),
    features: ["AC", "Music system", "Ideal for solo/couple trips"],
  },
  {
    type: "sedan",
    name: "Sedan (AC)",
    capacity: "Up to 4 passengers",
    pricePerKm: 13,
    image: photo("cab-sedan"),
    features: ["AC", "Extra legroom", "Best for city + airport transfers"],
  },
  {
    type: "suv",
    name: "SUV (AC)",
    capacity: "Up to 6 passengers",
    pricePerKm: 17,
    image: photo("cab-suv"),
    features: ["AC", "Extra luggage space", "Great for hill routes"],
  },
  {
    type: "tempo-traveller",
    name: "Tempo Traveller",
    capacity: "Up to 12 passengers",
    pricePerKm: 24,
    image: photo("cab-tempo"),
    features: ["AC", "Pushback seats", "Best for group tours"],
  },
];

export const cabRoutes = [
  { from: "Delhi Airport", to: "Manali", distanceKm: 540, durationHours: "12-14" },
  { from: "Goa Airport", to: "Baga Beach", distanceKm: 42, durationHours: "1" },
  { from: "Kochi Airport", to: "Munnar", distanceKm: 130, durationHours: "4" },
  { from: "Udaipur Airport", to: "City Centre", distanceKm: 24, durationHours: "0.5" },
  { from: "Srinagar Airport", to: "Gulmarg", distanceKm: 56, durationHours: "1.5" },
];
