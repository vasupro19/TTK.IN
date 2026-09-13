import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { regions } from "@/lib/data/regions";
import { listDepartureCities } from "@/lib/api/packages";
import { categoryLabels, mealLabels, transportLabels } from "@/lib/labels";
import type { PackageCategory, MealPlan, TransportMode } from "@/lib/types";

export interface ActiveFilters {
  q: string;
  region: string;
  destination: string;
  categories: string[];
  type: string;
  price: string;
  duration: string;
  hotel: string[];
  meals: string[];
  transport: string[];
  from: string;
  rating: string;
}

const priceBands = [
  { value: "0-15000", label: "Under ₹15,000" },
  { value: "15000-25000", label: "₹15,000 – ₹25,000" },
  { value: "25000-50000", label: "₹25,000 – ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-0", label: "Above ₹1,00,000" },
];

const durationBands = [
  { value: "1-3", label: "1 – 3 days" },
  { value: "4-6", label: "4 – 6 days" },
  { value: "7-9", label: "7 – 9 days" },
  { value: "10-99", label: "10 days or more" },
];

const ratingBands = [
  { value: "4.5", label: "4.5 and above" },
  { value: "4", label: "4.0 and above" },
];

const categoryOptions = Object.entries(categoryLabels) as [PackageCategory, string][];
const mealOptions = Object.entries(mealLabels).filter(([v]) => v !== "none") as [MealPlan, string][];
const transportOptions = Object.entries(transportLabels) as [TransportMode, string][];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-sand-200 pt-4 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-bold text-ink-900">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({
  name,
  value,
  label,
  defaultChecked,
  type = "checkbox",
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked: boolean;
  type?: "checkbox" | "radio";
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-700 hover:text-ink-900">
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-brand-600"
      />
      {label}
    </label>
  );
}

/**
 * A plain GET form — every filter is a URL parameter, so results are
 * shareable, bookmarkable and work without JavaScript.
 */
export function PackageFilters({ active }: { active: ActiveFilters }) {
  const departureCities = listDepartureCities();

  return (
    <form
      action="/packages"
      method="GET"
      className="space-y-5 rounded-2xl border border-sand-200 bg-white p-5"
    >
      {active.q && <input type="hidden" name="q" value={active.q} />}
      {active.destination && <input type="hidden" name="destination" value={active.destination} />}

      <div className="flex items-center gap-2 lg:hidden">
        <SlidersHorizontal className="h-4 w-4 text-brand-600" aria-hidden="true" />
        <span className="text-sm font-bold text-ink-900">Refine results</span>
      </div>

      <Group title="Destination">
        <select
          name="region"
          defaultValue={active.region}
          aria-label="Destination region"
          className="w-full rounded-xl border border-sand-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">All destinations</option>
          {regions.map((region) => (
            <option key={region.slug} value={region.slug}>
              {region.name}
            </option>
          ))}
        </select>
      </Group>

      <Group title="Trip type">
        <Check name="type" value="" label="All" defaultChecked={active.type === ""} type="radio" />
        <Check
          name="type"
          value="domestic"
          label="Domestic"
          defaultChecked={active.type === "domestic"}
          type="radio"
        />
        <Check
          name="type"
          value="international"
          label="International"
          defaultChecked={active.type === "international"}
          type="radio"
        />
      </Group>

      <Group title="Occasion">
        {categoryOptions.map(([value, label]) => (
          <Check
            key={value}
            name="category"
            value={value}
            label={label}
            defaultChecked={active.categories.includes(value)}
          />
        ))}
      </Group>

      <Group title="Price per person">
        <Check name="price" value="" label="Any price" defaultChecked={active.price === ""} type="radio" />
        {priceBands.map((band) => (
          <Check
            key={band.value}
            name="price"
            value={band.value}
            label={band.label}
            defaultChecked={active.price === band.value}
            type="radio"
          />
        ))}
      </Group>

      <Group title="Duration">
        <Check
          name="duration"
          value=""
          label="Any duration"
          defaultChecked={active.duration === ""}
          type="radio"
        />
        {durationBands.map((band) => (
          <Check
            key={band.value}
            name="duration"
            value={band.value}
            label={band.label}
            defaultChecked={active.duration === band.value}
            type="radio"
          />
        ))}
      </Group>

      <Group title="Hotel category">
        {([5, 4, 3] as const).map((star) => (
          <Check
            key={star}
            name="hotel"
            value={String(star)}
            label={`${star}★ and equivalent`}
            defaultChecked={active.hotel.includes(String(star))}
          />
        ))}
      </Group>

      <Group title="Meals">
        {mealOptions.map(([value, label]) => (
          <Check
            key={value}
            name="meals"
            value={value}
            label={label}
            defaultChecked={active.meals.includes(value)}
          />
        ))}
      </Group>

      <Group title="Transport">
        {transportOptions.map(([value, label]) => (
          <Check
            key={value}
            name="transport"
            value={value}
            label={label}
            defaultChecked={active.transport.includes(value)}
          />
        ))}
      </Group>

      <Group title="Departure city">
        <select
          name="from"
          defaultValue={active.from}
          aria-label="Departure city"
          className="w-full rounded-xl border border-sand-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">Any city</option>
          {departureCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </Group>

      <Group title="Rating">
        <Check
          name="rating"
          value=""
          label="Any rating"
          defaultChecked={active.rating === ""}
          type="radio"
        />
        {ratingBands.map((band) => (
          <Check
            key={band.value}
            name="rating"
            value={band.value}
            label={band.label}
            defaultChecked={active.rating === band.value}
            type="radio"
          />
        ))}
      </Group>

      <div className="space-y-2 border-t border-sand-200 pt-4">
        <button
          type="submit"
          className="w-full rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Apply filters
        </button>
        <Link
          href="/packages"
          className="block w-full rounded-full border border-sand-200 px-5 py-3 text-center text-sm font-semibold text-ink-700 transition-colors hover:bg-sand-50"
        >
          Clear all
        </Link>
      </div>
    </form>
  );
}
