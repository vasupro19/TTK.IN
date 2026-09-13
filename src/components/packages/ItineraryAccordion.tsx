"use client";

import { useState } from "react";
import { MapPin, Clock, Route, Utensils, BedDouble, Plus } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";
import { cn } from "@/lib/utils";

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-ink-600/75">
      <span className="text-brand-600">{icon}</span>
      {children}
    </span>
  );
}

export function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [openDays, setOpenDays] = useState<number[]>([days[0]?.day].filter(Boolean) as number[]);

  const toggle = (day: number) =>
    setOpenDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));

  const allOpen = openDays.length === days.length;

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setOpenDays(allOpen ? [] : days.map((d) => d.day))}
          className="text-xs font-semibold text-brand-700 hover:underline"
        >
          {allOpen ? "Collapse all days" : "Expand all days"}
        </button>
      </div>

      <ol className="relative space-y-3">
        {days.map((day) => {
          const isOpen = openDays.includes(day.day);
          const panelId = `itinerary-day-${day.day}`;

          return (
            <li
              key={day.day}
              className="overflow-hidden rounded-2xl border border-sand-200 bg-white"
            >
              <button
                type="button"
                onClick={() => toggle(day.day)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
              >
                <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-700 text-white">
                  <span className="text-[9px] font-semibold uppercase leading-none opacity-75">
                    Day
                  </span>
                  <span className="text-base font-extrabold leading-tight">{day.day}</span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink-900 sm:text-base">
                    {day.title}
                  </span>
                  {day.route && (
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-600/70">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{day.route}</span>
                    </span>
                  )}
                </span>

                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-100 text-ink-700 transition-transform duration-200",
                    isOpen && "rotate-45 bg-brand-50 text-brand-700"
                  )}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>

              {isOpen && (
                <div id={panelId} className="border-t border-sand-200 px-4 py-4 sm:px-5">
                  <p className="text-sm leading-relaxed text-ink-700">{day.description}</p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {day.distanceKm !== undefined && (
                      <Meta icon={<Route className="h-3.5 w-3.5" />}>
                        Approx. {day.distanceKm} km
                      </Meta>
                    )}
                    {day.travelTimeHours !== undefined && (
                      <Meta icon={<Clock className="h-3.5 w-3.5" />}>
                        {day.travelTimeHours < 1
                          ? `${Math.round(day.travelTimeHours * 60)} min drive`
                          : `${day.travelTimeHours} hr drive`}
                      </Meta>
                    )}
                    {day.meals && day.meals.length > 0 && (
                      <Meta icon={<Utensils className="h-3.5 w-3.5" />}>
                        {day.meals.join(", ")}
                      </Meta>
                    )}
                    {day.stay && (
                      <Meta icon={<BedDouble className="h-3.5 w-3.5" />}>{day.stay}</Meta>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
