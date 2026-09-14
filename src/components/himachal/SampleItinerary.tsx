"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, BedDouble, Plus } from "lucide-react";
import { sampleItinerary } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function SampleItinerary() {
  const [open, setOpen] = useState<number[]>([1]);
  const toggle = (day: number) =>
    setOpen((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  const allOpen = open.length === sampleItinerary.length;

  return (
    <section id="itinerary" className="scroll-mt-24 bg-sand-50 py-14 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          align="center"
          eyebrow="Sample plan"
          title="7 Days / 6 Nights — Shimla &amp; Manali"
          description="The classic first Himachal trip. Treat it as a starting point — we move nights around all the time."
          className="mx-auto"
        />

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? [] : sampleItinerary.map((d) => d.day))}
            className="text-xs font-semibold text-brand-700 hover:underline"
          >
            {allOpen ? "Collapse all days" : "Expand all days"}
          </button>
        </div>

        <ol className="mt-3 space-y-3">
          {sampleItinerary.map((stop) => {
            const isOpen = open.includes(stop.day);
            const panelId = `hp-itinerary-${stop.day}`;
            return (
              <li key={stop.day} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(stop.day)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-700 text-white">
                      <span className="text-[9px] font-semibold uppercase leading-none opacity-75">Day</span>
                      <span className="text-base font-extrabold leading-tight">{stop.day}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-ink-900 sm:text-base">{stop.title}</span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-600/70">
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{stop.route}</span>
                      </span>
                    </span>
                    <span className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-100 text-ink-700 transition-transform duration-200",
                      isOpen && "rotate-45 bg-brand-50 text-brand-700"
                    )}>
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={panelId} className="border-t border-sand-200 px-4 py-4 sm:px-5">
                    <p className="text-sm leading-relaxed text-ink-700">{stop.body}</p>
                    {stop.stay && (
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-600/75">
                        <BedDouble className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                        {stop.stay}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 text-center">
          <Link
            href="#enquiry"
            className="inline-block rounded-full bg-sunset-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sunset-500/25 transition-colors hover:bg-sunset-600"
          >
            Customize This Trip
          </Link>
          <p className="mt-3 text-xs text-ink-600/65">
            Add Dharamshala, swap Shimla for Kasol, or stretch it to nine nights — your call.
          </p>
        </div>
      </Container>
    </section>
  );
}
