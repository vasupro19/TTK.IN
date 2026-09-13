import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: `Cancellation timelines and charges for bookings made through ${siteConfig.name}.`,
  alternates: { canonical: "/cancellation-policy" },
};

const tiers = [
  { window: "30+ days before departure", charge: "10% of package cost" },
  { window: "15–29 days before departure", charge: "25% of package cost" },
  { window: "7–14 days before departure", charge: "50% of package cost" },
  { window: "0–6 days before departure", charge: "100% of package cost (non-refundable)" },
];

export default function CancellationPolicyPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Cancellation Policy</h1>
      <p className="mt-2 text-sm text-ink-600/60">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-700">
        <p>
          Cancellation charges are calculated as a percentage of the total package cost and depend
          on how far in advance of departure you cancel. Certain components (visa fees, non-refundable
          flight tickets, peak-season hotel bookings) may carry stricter, separately-disclosed terms.
        </p>

        <div className="overflow-hidden rounded-2xl border border-sand-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand-50 text-xs uppercase tracking-wide text-ink-600/60">
              <tr>
                <th className="px-4 py-3">Cancellation window</th>
                <th className="px-4 py-3">Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {tiers.map((tier) => (
                <tr key={tier.window}>
                  <td className="px-4 py-3 font-medium text-ink-900">{tier.window}</td>
                  <td className="px-4 py-3 text-ink-700">{tier.charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          To cancel a booking, contact your assigned travel consultant directly or write to{" "}
          {siteConfig.email} with your booking reference. Refunds, where applicable, are processed
          within 7–10 working days to the original payment method.
        </p>
      </div>
    </Container>
  );
}
