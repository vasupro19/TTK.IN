import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms and conditions governing bookings made through ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-ink-600/60">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-700">
        <section>
          <h2 className="text-base font-bold text-ink-900">1. Booking confirmation</h2>
          <p className="mt-2">
            A booking is confirmed only once the advance payment is received and a confirmation
            voucher is issued. Prices displayed on package pages are indicative and subject to
            confirmation at the time of booking, based on travel dates and availability.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">2. Traveller responsibilities</h2>
          <p className="mt-2">
            Travellers are responsible for carrying valid identification, visas (where applicable),
            and any required vaccination or health documentation. {siteConfig.name} is not liable
            for denied entry due to incomplete or invalid travel documents.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">3. Itinerary changes</h2>
          <p className="mt-2">
            Itineraries may be adjusted due to weather, local regulations, or circumstances beyond
            our control (road closures, flight delays, etc.). We will always attempt to offer a
            comparable alternative where a planned activity cannot proceed.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">4. Liability</h2>
          <p className="mt-2">
            {siteConfig.name} acts as an intermediary between travellers and third-party service
            providers (hotels, airlines, activity operators). While we vet our partners carefully,
            we are not liable for service deficiencies caused directly by those third parties.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">5. Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of India, with courts in Gurugram, Haryana having
            exclusive jurisdiction over any disputes.
          </p>
        </section>
      </div>
    </Container>
  );
}
