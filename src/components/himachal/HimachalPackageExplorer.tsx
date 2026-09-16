"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarRange, BedDouble, MessageCircle, ArrowRight } from "lucide-react";
import { useEnquiry } from "@/components/lead/EnquiryModal";

/**
 * Filterable package grid.
 *
 * Images are resolved on the server and handed over as plain strings — this
 * component never imports the image manifest, which would otherwise ship a few
 * hundred kilobytes of lookup table to the browser for no benefit.
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
}

const TRIP_TYPES = [
  { value: "all", label: "All" },
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "adventure", label: "Adventure" },
  { value: "group", label: "Group" },
] as const;

const DURATIONS = [
  { value: "all", label: "Any length" },
  { value: "3-4", label: "3–4 days" },
  { value: "5-6", label: "5–6 days" },
  { value: "7-8", label: "7–8 days" },
  { value: "9+", label: "9+ days" },
] as const;

const BUDGETS = [
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

function Card({ pkg, priority }: { pkg: PackageCardData; priority: boolean }) {
  const { open } = useEnquiry();
  const badge = badgeFor(pkg);

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
          {pkg.hotelCategory}★ hotels · breakfast &amp; dinner · private cab
        </p>

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
          <p className="text-[11px] text-ink-600/55">per person, on twin sharing</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center justify-center gap-1.5 rounded-full bg-sunset-500 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-sunset-600"
            >
              Book Now
            </button>
            <Link
              href={`/packages/${pkg.slug}`}
              className="flex items-center justify-center gap-1.5 rounded-full border border-sand-200 px-4 py-2.5 text-xs font-semibold text-ink-900 transition-colors hover:border-ink-900/25"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <a
            href={pkg.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1da851]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp about this trip
          </a>
        </div>
      </div>
    </article>
  );
}

export function HimachalPackageExplorer({ packages }: { packages: PackageCardData[] }) {
  const [type, setType] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [budget, setBudget] = useState<string>("all");

  const visible = useMemo(
    () =>
      packages.filter(
        (pkg) =>
          (type === "all" || pkg.categories.includes(type)) &&
          inDuration(pkg.days, duration) &&
          inBudget(pkg.price, budget),
      ),
    [packages, type, duration, budget],
  );

  const selectClass =
    "rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <div>
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by trip type">
          {TRIP_TYPES.map((option) => {
            const active = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                aria-pressed={active}
                className={
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
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
          <label className="sr-only" htmlFor="hp-duration">
            Trip length
          </label>
          <select
            id="hp-duration"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className={selectClass}
          >
            {DURATIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="hp-budget">
            Budget per person
          </label>
          <select
            id="hp-budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={selectClass}
          >
            {BUDGETS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-ink-600/70">
        Showing {visible.length} of {packages.length} Himachal itineraries
      </p>

      {visible.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((pkg, i) => (
            <Card key={pkg.slug} pkg={pkg} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-200 bg-sand-50 p-8 text-center">
          <p className="font-display text-lg font-bold text-ink-900">
            Nothing matches those filters
          </p>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-600/75">
            Most of our Himachal trips are built from scratch anyway — tell us your dates and
            budget and we will put an itinerary together.
          </p>
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
