import { Quote, Camera } from "lucide-react";
import { spitiReviews } from "@/lib/data/spiti";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { siteConfig } from "@/lib/seo";

/**
 * Traveller stories. Renders only verified reviews from lib/data/spiti.ts, in
 * the Himachal testimonial card design. With none on file it says so — it
 * never shows placeholder quotes as if they came from real customers.
 */
export function SpitiStories() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          tone="slate"
          eyebrow="Traveller stories"
          title="Stories From The Road"
          description="Real experiences from travellers exploring the Himalayas with TheTravelKart."
          className="mx-auto"
        />

        {spitiReviews.length > 0 ? (
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {spitiReviews.map((review) => (
              <figure
                key={review.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <Quote className="h-6 w-6 text-slate-300" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700 italic">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-slate-200 pt-4">
                  <span className="block text-sm font-semibold text-ink-900">{review.name}</span>
                  <span className="mt-0.5 block text-xs text-ink-600/65">
                    {review.trip} · {review.travelledOn}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-9 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
            <Quote className="mx-auto h-6 w-6 text-slate-300" aria-hidden="true" />
            <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
              We are collecting reviews from travellers who have done Spiti with us, and will
              publish them here as they come in. We would rather show none than show ones we cannot
              stand behind. In the meantime, ask us for a quote and judge the plan itself — the
              route, the stays and the price are all there before you pay anything.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <EnquiryButton className="w-full rounded-full bg-sunset-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-sunset-600 sm:w-auto">
                Get Free Quote
              </EnquiryButton>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-900/25 sm:w-auto"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Recent trips on Instagram
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
