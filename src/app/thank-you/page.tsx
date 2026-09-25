import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { GoogleAdsConversion } from "@/components/analytics/GoogleAdsConversion";
import { Container } from "@/components/ui/Container";
import { siteConfig, telLink, whatsappLink } from "@/lib/seo";

/**
 * Where every completed enquiry lands.
 *
 * A separate URL rather than an inline success state, so the conversion is a
 * real pageview: analytics, Google Ads and Meta can all count /thank-you as the
 * goal without any extra event wiring.
 */
export const metadata: Metadata = {
  title: "Thank You — We’ve Got Your Enquiry",
  description:
    "Thanks for your enquiry. A TheTravelKart travel expert will call you back with a Himachal itinerary.",
  alternates: { canonical: "/thank-you" },
  // A conversion page has no business in search results.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Container className="max-w-2xl py-20 text-center sm:py-28">
      <GoogleAdsConversion />
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Thank you — we have your enquiry
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-700">
        One of our travel experts will call you back, usually within a working day, with an
        itinerary built around your dates and budget. Nothing is booked and nothing is charged
        until you say so.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappLink("Hi TheTravelKart, I just submitted an enquiry for a Himachal trip.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1da851] sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Message us now
        </a>
        <a
          href={telLink()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-white px-7 py-3.5 text-sm font-bold text-ink-900 transition-colors hover:border-ink-900/20 sm:w-auto"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {siteConfig.phoneDisplay}
        </a>
      </div>

      <p className="mt-10 text-sm text-ink-600/70">
        In the meantime, have a look at our{" "}
        <Link
          href="/himachal-pradesh-tour-packages"
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          Himachal tour packages
        </Link>{" "}
        or{" "}
        <Link
          href="/packages"
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          browse every trip we run
        </Link>
        .
      </p>
    </Container>
  );
}
