import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Clock, PencilRuler, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { getPackage } from "@/lib/api/packages";
import { getRegion } from "@/lib/api/catalogue";
import { siteConfig, whatsappLink, telLink, breadcrumbJsonLd } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { durationLabel } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Plan My Trip — Free Custom Itinerary",
  description:
    "Tell TheTravelKart where you want to go and a travel expert will build a custom itinerary with named hotels and honest pricing, usually within a working day.",
  alternates: { canonical: "/plan-my-trip" },
};

const steps = [
  {
    icon: PencilRuler,
    title: "You tell us the shape of it",
    body: "Dates, who is travelling, a budget range and anything that matters — an anniversary, elderly parents, a must-see stop.",
  },
  {
    icon: Clock,
    title: "We come back with a real plan",
    body: "A day-by-day itinerary with named hotels, drive times and an itemised price. Not a brochure.",
  },
  {
    icon: ShieldCheck,
    title: "You change whatever you want",
    body: "Move a night, swap a hotel, add a day. We rework it until it fits, then you confirm.",
  },
];

export default async function PlanMyTripPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const packageSlug = typeof params.package === "string" ? params.package : undefined;
  const intent = typeof params.intent === "string" ? params.intent : undefined;

  const pkg = packageSlug ? getPackage(packageSlug) : undefined;
  const region = pkg ? getRegion(pkg.regionSlug) : undefined;

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plan My Trip", path: "/plan-my-trip" },
  ]);

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Plan My Trip</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              {pkg
                ? intent === "quote"
                  ? "Get a free quote"
                  : "Book this trip"
                : "Tell Us Where You Want To Go"}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600/80">
              {pkg
                ? "Send us your dates and we will confirm live availability, the exact hotels and a final price before you pay anything."
                : "There is no obligation and no payment. A travel expert reads every enquiry personally and replies with a real itinerary."}
            </p>

            {pkg && (
              <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Enquiring about
                </p>
                <p className="mt-1.5 font-display text-lg font-bold text-ink-900">{pkg.title}</p>
                <p className="mt-1 text-sm text-ink-600/75">
                  {durationLabel(pkg.durationDays, pkg.durationNights)} ·{" "}
                  {pkg.routeCities.join(" • ")} · from {formatINR(pkg.price)} per person
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="mt-2.5 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  Review the full itinerary →
                </Link>
              </div>
            )}

            <ol className="mt-9 space-y-6">
              {steps.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-900">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-600/75">
                      {body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-9 rounded-2xl border border-sand-200 bg-white p-5">
              <p className="text-sm font-bold text-ink-900">In a hurry?</p>
              <p className="mt-1 text-sm text-ink-600/75">
                Call or message us directly — we answer during working hours, every day.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={telLink()}
                  className="flex items-center gap-2 rounded-full border border-sand-200 px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-sand-50"
                >
                  <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  href={telLink(siteConfig.altPhoneRaw)}
                  className="flex items-center gap-2 rounded-full border border-sand-200 px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-sand-50"
                >
                  <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {siteConfig.altPhoneDisplay}
                </a>
                <a
                  href={whatsappLink(
                    pkg
                      ? `Hi TheTravelKart, I'd like to plan "${pkg.title}".`
                      : siteConfig.whatsappMessage
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28 lg:self-start">
            <LeadForm
              packageSlug={pkg?.slug}
              defaultDestination={pkg ? (region?.name ?? pkg.routeCities[0]) : ""}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
