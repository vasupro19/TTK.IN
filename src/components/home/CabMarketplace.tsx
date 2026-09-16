import Link from "next/link";
import { ArrowRight, BadgeCheck, IndianRupee, Users, Route } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

const travellerPoints = [
  { icon: IndianRupee, text: "Compare quotes from verified operators before you commit" },
  { icon: Route, text: "One trip brief — airport runs, full circuits or multi-day charters" },
  { icon: BadgeCheck, text: "Papers, permits and driver details checked by us" },
];

const partnerPoints = [
  { icon: Users, text: "Verified travel enquiries from your own operating region" },
  { icon: IndianRupee, text: "Transparent commissions, settled on a fixed cycle" },
  { icon: BadgeCheck, text: "A partner profile travellers can actually see and rate" },
];

export function CabMarketplace() {
  return (
    <section className="bg-ink-900 py-16 text-white sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Cab marketplace"
          title="Your Ride, Your Way"
          description="Mountain roads are not the place to gamble on a vehicle. Post your trip once and compare verified operators — or bring your fleet onto the platform."
          className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:bg-white/10 [&_span]:text-brand-200"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Travellers */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 sm:p-9">
            <div className="absolute -right-10 -top-10 h-40 w-40 opacity-15">
              <SmartImage seed="cab-traveller" alt="" sizes="160px" className="rounded-full object-cover" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">
              For travellers
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Get Free Cab Quotes
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Post your trip once and compare quotes from verified drivers who work that route every
              week. No booking fee, no obligation.
            </p>

            <ul className="mt-6 space-y-3">
              {travellerPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <Link
              href="/cabs#get-quotes"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-all hover:bg-brand-100"
            >
              Get Free Quotes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Partners */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-white/20 sm:p-9">
            <div className="absolute -right-10 -top-10 h-40 w-40 opacity-15">
              <SmartImage seed="cab-partner" alt="" sizes="160px" className="rounded-full object-cover" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sunset-300">
              For cab partners
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Grow With TheTravelKart
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Register your fleet and receive verified travel enquiries from travellers already
              planning a trip through your region.
            </p>

            <ul className="mt-6 space-y-3">
              {partnerPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sunset-300" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <Link
              href="/cabs#register"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-sunset-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sunset-600"
            >
              Register Your Cab
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
