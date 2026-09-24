"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarRange, BedDouble, MessageCircle, ArrowRight, Info } from "lucide-react";
import { useEnquiry } from "@/components/lead/EnquiryModal";

/**
 * Filterable package grid, shared by the destination landing pages.
 *
 * Images are resolved on the server and handed over as plain strings — this
 * component never imports the image manifest, which would otherwise ship a few
 * hundred kilobytes of lookup table to the browser for no benefit.
 *
 * Every option defaults to what the Himachal page has always shown, so a page
 * only passes what is different about its own destination.
 */
export interface PackageCardData {
  slug: string;
  title: string;
  route: string[];
  nights: number;
  days: number;
  price: number;
  strikeThroughPrice?: number;
  hotelCategory: number;
  summary: string;
  categories: string[];
  featured: boolean;
  imageSrc: string;
  imageAlt: string;
  whatsappHref: string;
  /**
   * The card's one badge. Leave undefined to derive it from the package; pass
   * null for a deliberately unbadged card.
   */
  badge?: string | null;
  /** Stay / meals / transport line. Defaults to "<n>★ hotels · breakfast & dinner · private cab". */
  stayLine?: string;
  /** One short practical line under the stay line, e.g. a seasonal caveat. */
  note?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  /**
   * Inclusive range for a duration (days) or budget (₹) option. Options
   * without one fall back to the fixed bands below, keyed by `value`.
   */
  min?: number;
  max?: number;
}

/** The last card in the grid: no package behind it, just an enquiry. */
export interface CustomCardData {
  title: string;
  summary: string;
  badge?: string;
  durationLabel: string;
  routeLabel: string;
  stayLine: string;
  priceLabel: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  whatsappHref: string;
}

const TRIP_TYPES: readonly FilterOption[] = [
  { value: "all", label: "All" },
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "adventure", label: "Adventure" },
  { value: "group", label: "Group" },
] as const;

const DURATIONS: readonly FilterOption[] = [
  { value: "all", label: "Any length" },
  { value: "3-4", label: "3–4 days" },
  { value: "5-6", label: "5–6 days" },
  { value: "7-8", label: "7–8 days" },
  { value: "9+", label: "9+ days" },
] as const;

const BUDGETS: readonly FilterOption[] = [
  { value: "all", label: "Any budget" },
  { value: "under-15", label: "Under ₹15,000" },
  { value: "15-25", label: "₹15,000 – ₹25,000" },
  { value: "25+", label: "₹25,000+" },
] as const;

function inDuration(days: number, band: string): boolean {
  switch (band) {
    case "3-4":
      return days >= 3 && days <= 4;
    case "5-6":
      return days >= 5 && days <= 6;
    case "7-8":
      return days >= 7 && days <= 8;
    case "9+":
      return days >= 9;
    default:
      return true;
  }
}

function inBudget(price: number, band: string): boolean {
  switch (band) {
    case "under-15":
      return price < 15000;
    case "15-25":
      return price >= 15000 && price <= 25000;
    case "25+":
      return price > 25000;
    default:
      return true;
  }
}

/** At most one badge per card — a wall of labels reads as noise, not emphasis. */
function badgeFor(pkg: PackageCardData): string | null {
  if (pkg.featured) return "Best seller";
  if (pkg.price < 9000) return "Budget friendly";
  if (pkg.categories.includes("honeymoon")) return "Honeymoon";
  if (pkg.categories.includes("adventure")) return "Adventure";
  return null;
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function inRange(value: number, option: FilterOption | undefined): boolean | null {
  if (!option || (option.min === undefined && option.max === undefined)) return null;
  return value >= (option.min ?? -Infinity) && value <= (option.max ?? Infinity);
}

function Card({
  pkg,
  priority,
  detailsLabel,
  priceNote,
}: {
  pkg: PackageCardData;
  priority: boolean;
  detailsLabel: string;
  priceNote: string;
}) {
  const { open } = useEnquiry();
  const badge = pkg.badge !== undefined ? pkg.badge : badgeFor(pkg);
  const longDetailsLabel = detailsLabel.length > 8;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/packages/${pkg.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={pkg.imageSrc}
          alt={pkg.imageAlt}
          fill
          sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 88vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-sunset-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {badge}
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-ink-900 backdrop-blur-sm">
          <CalendarRange className="h-3 w-3" aria-hidden="true" />
          {pkg.nights}N / {pkg.days}D
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
          <Link href={`/packages/${pkg.slug}`} className="hover:text-brand-700">
            {pkg.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-ink-700">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{pkg.route.join(" • ")}</span>
        </p>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600/75">
          <BedDouble className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          {pkg.stayLine ?? `${pkg.hotelCategory}★ hotels · breakfast & dinner · private cab`}
        </p>

        {pkg.note && (
          <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-600/75">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
            {pkg.note}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600/80">{pkg.summary}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold text-ink-900">
              {inr.format(pkg.price)}
            </span>
            {pkg.strikeThroughPrice && (
              <span className="text-xs text-ink-600/50 line-through">
                {inr.format(pkg.strikeThroughPrice)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-ink-600/55">{priceNote}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => open()}
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-sunset-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sunset-600"
            >
              Book Now
            </button>
            <Link
              href={`/packages/${pkg.slug}`}
              className={
                "flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-sand-200 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-900/25 " +
                // A longer label ("View Package") has to stay on one line in
                // half a 360px card, so it gets tighter padding and drops the
                // arrow on the narrowest phones.
                (longDetailsLabel ? "px-3" : "px-4")
              }
            >
              {detailsLabel}
              <ArrowRight
                className={"h-3.5 w-3.5 " + (longDetailsLabel ? "hidden min-[400px]:block" : "")}
                aria-hidden="true"
              />
            </Link>
          </div>
          <a
            href={pkg.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp about this trip
          </a>
        </div>
      </div>
    </article>
  );
}

function CustomCard({ card }: { card: CustomCardData }) {
  const { open } = useEnquiry();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-ink-900/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 88vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {card.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {card.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-ink-900 backdrop-blur-sm">
          <CalendarRange className="h-3 w-3" aria-hidden="true" />
          {card.durationLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900">{card.title}</h3>
        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-ink-700">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          <span>{card.routeLabel}</span>
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-600/75">
          <BedDouble className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
          {card.stayLine}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-600/80">{card.summary}</p>

        <div className="mt-auto pt-5">
          <p className="font-display text-2xl font-extrabold text-ink-900">{card.priceLabel}</p>
          <p className="text-[11px] text-ink-600/55">priced on your route, dates and group size</p>
          <button
            type="button"
            onClick={() => open()}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-sunset-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sunset-600"
          >
            {card.ctaLabel}
          </button>
          <a
            href={card.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp us your route
          </a>
        </div>
      </div>
    </article>
  );
}

export function PackageExplorer({
  packages,
  tripTypes = TRIP_TYPES,
  durations = DURATIONS,
  budgets = BUDGETS,
  placeName = "Himachal",
  idPrefix = "hp",
  emptyMessage = "Most of our Himachal trips are built from scratch anyway — tell us your dates and budget and we will put an itinerary together.",
  detailsLabel = "Details",
  priceNote = "per person, on twin sharing",
  customCard,
}: {
  packages: PackageCardData[];
  tripTypes?: readonly FilterOption[];
  durations?: readonly FilterOption[];
  budgets?: readonly FilterOption[];
  /** Used in "Showing 4 of 8 <placeName> itineraries". */
  placeName?: string;
  /** Keeps the filter controls' ids unique to the page. */
  idPrefix?: string;
  emptyMessage?: string;
  /** Label of each card's link to its package page. */
  detailsLabel?: string;
  /** The line under each price. */
  priceNote?: string;
  /** Appended after the filtered cards, whatever the filters, when any match. */
  customCard?: CustomCardData;
}) {
  const [type, setType] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [budget, setBudget] = useState<string>("all");

  const visible = useMemo(
    () =>
      packages.filter(
        (pkg) =>
          (type === "all" || pkg.categories.includes(type)) &&
          (inRange(pkg.days, durations.find((o) => o.value === duration)) ??
            inDuration(pkg.days, duration)) &&
          (inRange(pkg.price, budgets.find((o) => o.value === budget)) ??
            inBudget(pkg.price, budget)),
      ),
    [packages, type, duration, budget, durations, budgets],
  );

  const selectClass =
    // min-w-0 + flex-1 below sm lets the pair share a 360px phone's width
    // instead of pushing the page sideways; from sm up they size to content.
    "min-h-11 min-w-0 flex-1 rounded-full border border-sand-200 bg-white px-4 py-2 text-base font-semibold text-ink-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 sm:flex-none sm:text-sm";

  return (
    <div>
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by trip type">
          {tripTypes.map((option) => {
            const active = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                aria-pressed={active}
                className={
                  "min-h-11 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
                  (active
                    ? "bg-ink-900 text-white"
                    : "border border-sand-200 bg-white text-ink-800 hover:border-ink-900/25")
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <label className="sr-only" htmlFor={`${idPrefix}-duration`}>
            Trip length
          </label>
          <select
            id={`${idPrefix}-duration`}
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className={selectClass}
          >
            {durations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor={`${idPrefix}-budget`}>
            Budget per person
          </label>
          <select
            id={`${idPrefix}-budget`}
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={selectClass}
          >
            {budgets.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-ink-600/70">
        Showing {visible.length} of {packages.length} {placeName} itineraries
      </p>

      {visible.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((pkg, i) => (
            <Card
              key={pkg.slug}
              pkg={pkg}
              priority={i < 3}
              detailsLabel={detailsLabel}
              priceNote={priceNote}
            />
          ))}
          {customCard && <CustomCard card={customCard} />}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-200 bg-sand-50 p-8 text-center">
          <p className="font-display text-lg font-bold text-ink-900">
            Nothing matches those filters
          </p>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-600/75">{emptyMessage}</p>
          <button
            type="button"
            onClick={() => {
              setType("all");
              setDuration("all");
              setBudget("all");
            }}
            className="mt-4 rounded-full border border-sand-200 bg-white px-6 py-2.5 text-sm font-semibold text-ink-900 hover:border-ink-900/25"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
