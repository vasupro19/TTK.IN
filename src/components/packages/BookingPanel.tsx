"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Users, MessageCircle, ShieldCheck } from "lucide-react";
import type { Package } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { siteConfig } from "@/lib/seo";

/** Children sharing a bed with parents are quoted at 75% of the adult rate. */
const CHILD_RATE = 0.75;

export function BookingPanel({ pkg }: { pkg: Package }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState("");

  const adultTotal = adults * pkg.price;
  const childTotal = Math.round(children * pkg.price * CHILD_RATE);
  const total = adultTotal + childTotal;

  const whatsappText = encodeURIComponent(
    `Hi TheTravelKart, I'm interested in "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N).` +
      (date ? ` Travel date: ${date}.` : "") +
      ` Travellers: ${adults} adult${adults !== 1 ? "s" : ""}${children ? ` and ${children} child${children !== 1 ? "ren" : ""}` : ""}.` +
      " Could you share a quote?"
  );

  const fieldClass =
    "w-full rounded-xl border border-sand-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-ink-600/60">Starting from</p>
          <p className="font-display text-3xl font-extrabold text-ink-900">
            {formatINR(pkg.price)}
          </p>
          <p className="text-xs text-ink-600/55">per person on twin sharing</p>
        </div>
        {pkg.strikeThroughPrice && (
          <div className="text-right">
            <p className="text-sm text-ink-600/45 line-through">
              {formatINR(pkg.strikeThroughPrice)}
            </p>
            <p className="text-xs font-bold text-sunset-600">
              Save {formatINR(pkg.strikeThroughPrice - pkg.price)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label
            htmlFor="booking-date"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-800"
          >
            <CalendarDays className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            Travel date
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="booking-adults"
              className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-800"
            >
              <Users className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              Adults
            </label>
            <select
              id="booking-adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={fieldClass}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="booking-children"
              className="mb-1.5 block text-xs font-semibold text-ink-800"
            >
              Children (2–11)
            </label>
            <select
              id="booking-children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className={fieldClass}
            >
              {Array.from({ length: 7 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing summary */}
      <dl className="mt-5 space-y-2 rounded-xl bg-sand-50 p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-600/75">
            {adults} adult{adults !== 1 ? "s" : ""} × {formatINR(pkg.price)}
          </dt>
          <dd className="font-semibold text-ink-900">{formatINR(adultTotal)}</dd>
        </div>
        {children > 0 && (
          <div className="flex justify-between">
            <dt className="text-ink-600/75">
              {children} child{children !== 1 ? "ren" : ""} × {formatINR(Math.round(pkg.price * CHILD_RATE))}
            </dt>
            <dd className="font-semibold text-ink-900">{formatINR(childTotal)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-sand-200 pt-2">
          <dt className="font-bold text-ink-900">Indicative total</dt>
          <dd className="font-display text-lg font-extrabold text-ink-900">{formatINR(total)}</dd>
        </div>
        <p className="text-[11px] leading-relaxed text-ink-600/60">
          Indicative only — your coordinator confirms the final figure against live hotel rates and
          your exact dates before anything is booked.
        </p>
      </dl>

      <div className="mt-5 space-y-2.5">
        <Link
          href={`/plan-my-trip?package=${pkg.slug}`}
          className="block rounded-full bg-sunset-500 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-all hover:bg-sunset-600 active:scale-[0.99]"
        >
          Book This Trip
        </Link>
        <Link
          href={`/plan-my-trip?package=${pkg.slug}&intent=quote`}
          className="block rounded-full border border-sand-200 px-6 py-3 text-center text-sm font-semibold text-ink-800 transition-colors hover:bg-sand-50"
        >
          Get Free Quote
        </Link>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp Us
        </a>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs text-ink-600/65">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
        No payment needed to enquire. You will see the full itinerary and named hotels before you
        pay anything.
      </p>
    </div>
  );
}
