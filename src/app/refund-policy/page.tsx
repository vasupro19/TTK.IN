import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How refunds are processed for cancellations and payment errors made through ${siteConfig.name}.`,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Refund Policy</h1>
      <p className="mt-2 text-sm text-ink-600/60">Last updated: September 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-700">
        <section>
          <h2 className="text-base font-bold text-ink-900">Eligible refunds</h2>
          <p className="mt-2">
            Refunds apply to cancellations made in line with our{" "}
            <Link href="/cancellation-policy" className="font-semibold text-brand-700">
              Cancellation Policy
            </Link>
            , duplicate payments, or bookings where a confirmed service could not be delivered
            due to an error on our end.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">Processing time</h2>
          <p className="mt-2">
            Approved refunds are processed within 7–10 working days to the original payment
            method. Bank processing times beyond this window are outside our control.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">Non-refundable components</h2>
          <p className="mt-2">
            Visa fees once submitted to the relevant embassy/consulate, and airline tickets booked
            under non-refundable fare classes, are excluded from refunds regardless of
            cancellation timing.
          </p>
        </section>
        <section>
          <h2 className="text-base font-bold text-ink-900">How to request a refund</h2>
          <p className="mt-2">
            Write to {siteConfig.email} with your booking reference and the reason for the refund
            request. Our team will confirm the eligible amount in writing before processing.
          </p>
        </section>
      </div>
    </Container>
  );
}
