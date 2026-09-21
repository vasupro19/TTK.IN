import { Quote } from "lucide-react";
import { himachalTestimonials } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Traveller stories. The copy lives in lib/data/himachal.ts, which carries the
 * standing note that these still need to be replaced with verified reviews —
 * we do not ship invented star ratings, photos or headline numbers.
 */
export function Testimonials() {
  return (
    // Why Us sits directly above and shares this background, so a hairline
    // keeps the two bands from reading as one very tall section.
    <section className="border-t border-sand-200 bg-sand-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Traveller stories"
          title="What Our Travellers Say"
          description="Reviews from travellers who planned their Himachal trip with us."
          className="mx-auto"
        />

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {himachalTestimonials.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <Quote className="h-6 w-6 text-brand-200" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700 italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-sand-200 pt-4">
                <span className="block text-sm font-semibold text-ink-900">{t.name}</span>
                <span className="mt-0.5 block text-xs text-ink-600/65">
                  {t.trip} · {t.destination}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
