import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-600/60">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-700">
        <section>
          <h2 className="text-base font-bold text-ink-900">1. Information we collect</h2>
          <p className="mt-2">
            When you make an enquiry, book a package, or subscribe to our newsletter, we collect
            your name, phone number, email address, and any trip details you share with us
            (destination, travel dates, number of travellers). We do not collect payment card
            details directly — payments are processed through PCI-compliant third-party gateways.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">2. How we use it</h2>
          <p className="mt-2">
            We use your information to respond to enquiries, prepare quotations, process bookings,
            share booking-related updates (via call, WhatsApp, SMS, or email), and — where you&apos;ve
            opted in — send you offers and travel guides.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">3. Sharing with third parties</h2>
          <p className="mt-2">
            We share the minimum necessary details with hotels, airlines, and ground operators to
            fulfil your booking. We do not sell your personal information to third parties for
            marketing purposes.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">4. Your choices</h2>
          <p className="mt-2">
            You can unsubscribe from marketing emails at any time using the link in any newsletter,
            or by writing to {siteConfig.email}. You may also request a copy or deletion of your
            personal data by contacting us directly.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">5. Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to {siteConfig.email} or {siteConfig.phone}.
          </p>
        </section>
      </div>
    </Container>
  );
}
