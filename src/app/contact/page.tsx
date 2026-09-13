import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TheTravelKart's travel consultants for a new booking, existing trip support, or partnership enquiries.",
  alternates: { canonical: "/contact" },
};

const contactPoints = [
  {
    label: "Call us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    label: "WhatsApp",
    value: "Chat instantly",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
];

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Let&apos;s Plan Your Trip
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          Fill out the form and a travel consultant will reach out within a few hours — or reach us
          directly below.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          <div className="rounded-2xl border border-sand-200 bg-white p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-600/60">
                Get in touch
              </h2>
              <ul className="mt-4 space-y-4">
                {contactPoints.map((point) => (
                  <li key={point.label}>
                    <p className="text-xs text-ink-600/60">{point.label}</p>
                    <a
                      href={point.href}
                      target={point.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      {point.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-600/60">
                Office
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{siteConfig.address}</p>
              <p className="mt-3 text-xs text-ink-600/60">
                Mon–Sat, 9:30 AM – 7:30 PM IST. WhatsApp support is available 24/7 for travellers
                currently on a trip.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
