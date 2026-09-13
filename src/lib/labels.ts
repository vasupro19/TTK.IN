import type { HotelCategory, MealPlan, PackageCategory, TransportMode } from "@/lib/types";

export const categoryLabels: Record<PackageCategory, string> = {
  honeymoon: "Honeymoon",
  family: "Family",
  adventure: "Adventure",
  pilgrimage: "Pilgrimage",
  luxury: "Luxury",
  group: "Group",
  corporate: "Corporate",
  weekend: "Weekend",
};

export const mealLabels: Record<MealPlan, string> = {
  none: "Meals not included",
  breakfast: "Breakfast",
  "breakfast-dinner": "Breakfast & Dinner",
  "all-meals": "All meals",
};

export const transportLabels: Record<TransportMode, string> = {
  "private-cab": "Private cab",
  "shared-coach": "Tempo traveller",
  volvo: "Volvo coach",
  "flight-inclusive": "Flights & ferries",
  "self-drive": "Self-ride",
};

export function hotelLabel(category: HotelCategory): string {
  return `${category}★ hotels`;
}

export function durationLabel(days: number, nights: number): string {
  return `${days} Days / ${nights} Nights`;
}

export function shortDurationLabel(days: number, nights: number): string {
  return `${days}D / ${nights}N`;
}
