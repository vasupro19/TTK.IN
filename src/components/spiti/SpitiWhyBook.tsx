import { spitiWhyChoose } from "@/lib/data/spiti";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpitiWhyBook() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          tone="slate"
          eyebrow="Why us"
          title="Why Travel Spiti With TheTravelKart?"
          description="Spiti is not a destination where the itinerary should be planned only around distances. Altitude, road conditions, weather and driving time all matter."
          className="mx-auto"
        />

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {spitiWhyChoose.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
