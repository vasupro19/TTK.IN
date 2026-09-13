import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers — Work With TheTravelKart",
  description:
    "Open roles at TheTravelKart for travel consultants, operations coordinators and content writers. Based in Himachal, working across India.",
  alternates: { canonical: "/careers" },
};

const openings = [
  {
    title: "Travel Consultant — Himalayan Circuits",
    location: "Himachal Pradesh (on-site)",
    type: "Full time",
    body: "Plan and quote trips across Himachal, Spiti and Ladakh. You have driven or travelled these routes yourself and can tell a traveller honestly when a plan will not work.",
  },
  {
    title: "Operations Coordinator",
    location: "Himachal Pradesh (on-site)",
    type: "Full time",
    body: "Own trips once they are confirmed — hotel vouchers, driver briefings, permits and the WhatsApp thread travellers actually rely on while they are on the road.",
  },
  {
    title: "Travel Writer & Content Lead",
    location: "Remote (India)",
    type: "Contract",
    body: "Write destination guides and itinerary notes that are genuinely useful — seasons, road conditions, what is worth the money and what is not.",
  },
];

export default function CareersPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
  ]);

  return (
    <div className="py-10 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Careers</span>
        </nav>

        <SectionHeading
          eyebrow="Careers"
          title="Work With TheTravelKart"
          description="We are a small team that would rather turn a trip down than sell one badly. If that sounds like how you work, we would like to hear from you."
        />

        <div className="mt-10 space-y-4">
          {openings.map((role) => (
            <article key={role.title} className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold text-ink-900">{role.title}</h2>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-600/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                  {role.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                  {role.type}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600/80">{role.body}</p>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Apply for this role
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-sand-50 p-6 text-center">
          <p className="text-sm text-ink-700">
            Nothing here that fits? Write to us anyway at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-brand-700 hover:underline">
              {siteConfig.email}
            </a>{" "}
            with what you would want to do.
          </p>
        </div>
      </Container>
    </div>
  );
}
