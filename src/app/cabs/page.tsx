import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, IndianRupee, Route, Users, ShieldCheck, Clock } from "lucide-react";
import { cabOptions, cabRoutes } from "@/lib/data/cabs";
import { CabQuoteForm, CabPartnerForm } from "@/components/forms/CabForms";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata: Metadata = {
  title: "Cabs — Compare Verified Driver Quotes",
  description:
    "Post your trip once and compare quotes from verified cab operators across Himachal, Kashmir, Ladakh and beyond. Cab owners can register their fleet and receive travel enquiries.",
  alternates: { canonical: "/cabs" },
};

const travellerPromises = [
  { icon: IndianRupee, title: "Compare before you commit", body: "Several quotes for the same trip, side by side — you pick." },
  { icon: BadgeCheck, title: "Papers actually checked", body: "RC, permit, insurance and driver licence verified before listing." },
  { icon: Route, title: "Any shape of trip", body: "Airport runs, day trips, full circuits or multi-day charters." },
  { icon: Clock, title: "No booking fee", body: "Getting quotes is free and carries no obligation." },
];

export default function CabsPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Cabs", path: "/cabs" },
  ]);

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-ink-900 py-14 text-white sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/55">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/85">Cabs</span>
          </nav>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Your Ride, Your Way
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Mountain roads are not the place to gamble on a vehicle or a driver. Post your trip once
            and compare verified operators — or bring your own fleet onto the platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#get-quotes" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-100">
              Get Free Quotes
            </Link>
            <Link href="#register" className="rounded-full bg-sunset-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sunset-600">
              Register Your Cab
            </Link>
          </div>
        </Container>
      </section>

      {/* Travellers */}
      <section id="get-quotes" className="scroll-mt-28 py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="For travellers"
                title="Get Free Cab Quotes"
                description="Tell us the route once. Operators who drive it every week quote you directly — you compare and choose."
              />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {travellerPromises.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="rounded-2xl border border-sand-200 bg-white p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3.5 text-sm font-bold text-ink-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600/75">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
              <CabQuoteForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Fleet */}
      <section className="bg-sand-50 py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The fleet"
            title="Vehicles on the platform"
            description="Indicative per-km rates. Your final quote depends on route, season and how many days the vehicle is with you."
          />
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cabOptions.map((cab) => (
              <div key={cab.type} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
                <div className="relative aspect-[4/3] w-full">
                  <SmartImage
                    seed={cab.imageSeed}
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-ink-900">{cab.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-600/65">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {cab.capacity}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {cab.features.map((f) => (
                      <li key={f} className="text-xs text-ink-600/75">• {f}</li>
                    ))}
                  </ul>
                  <p className="mt-3.5 border-t border-sand-200 pt-3 font-display text-lg font-extrabold text-ink-900">
                    ₹{cab.pricePerKm}
                    <span className="text-xs font-normal text-ink-600/60"> / km onwards</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink-900">Frequently booked routes</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-sand-200 bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">Popular cab routes with distance and typical drive time</caption>
                <thead className="bg-sand-50 text-xs uppercase tracking-wide text-ink-600/60">
                  <tr>
                    <th scope="col" className="px-4 py-3">From</th>
                    <th scope="col" className="px-4 py-3">To</th>
                    <th scope="col" className="px-4 py-3">Distance</th>
                    <th scope="col" className="px-4 py-3">Typical drive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {cabRoutes.map((route) => (
                    <tr key={`${route.from}-${route.to}`}>
                      <td className="px-4 py-3 font-medium text-ink-900">{route.from}</td>
                      <td className="px-4 py-3 text-ink-700">{route.to}</td>
                      <td className="px-4 py-3 text-ink-600/75">{route.distanceKm} km</td>
                      <td className="px-4 py-3 text-ink-600/75">{route.durationHours} hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section id="register" className="scroll-mt-28 py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="order-2 rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
              <CabPartnerForm />
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="For cab partners"
                title="Grow With TheTravelKart"
                description="Register your fleet and receive verified travel enquiries from people already planning a trip through your region."
              />
              <ul className="mt-8 space-y-5">
                <li className="flex gap-3.5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-ink-900">Real enquiries, not cold leads</p>
                    <p className="mt-1 text-sm text-ink-600/75">
                      Travellers who have already told us their dates, route and group size.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <IndianRupee className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-ink-900">Transparent commission</p>
                    <p className="mt-1 text-sm text-ink-600/75">
                      One agreed rate, settled on a fixed cycle. No surprise deductions.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3.5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-ink-900">A profile that earns you repeat work</p>
                    <p className="mt-1 text-sm text-ink-600/75">
                      Travellers rate the drive. Good operators get sent more of it.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
