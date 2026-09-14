import { Quote, Info } from "lucide-react";
import { testimonialPlaceholders } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Testimonials are PLACEHOLDERS. We deliberately do not ship invented customer
 * names, photos or ratings — replace `testimonialPlaceholders` in
 * lib/data/himachal.ts with verified reviews before launch.
 */
export function Testimonials() {
  return (
    <section className="bg-sand-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Traveller stories"
          title="What Our Travellers Say"
          description="Real reviews from travellers who booked with us."
          className="mx-auto"
        />

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonialPlaceholders.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-2xl border border-dashed border-sand-200 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-brand-200" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-600/70 italic">
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

        <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-xl bg-white px-4 py-3 text-xs leading-relaxed text-ink-600/70">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-ink-800">Note for the TheTravelKart team:</strong>{" "}
            these are placeholders. Replace them with verified customer reviews in{" "}
            <code className="rounded bg-sand-100 px-1 py-0.5 font-mono text-[11px]">
              lib/data/himachal.ts
            </code>{" "}
            before this page goes live. We have not invented names or ratings.
          </span>
        </p>
      </Container>
    </section>
  );
}
