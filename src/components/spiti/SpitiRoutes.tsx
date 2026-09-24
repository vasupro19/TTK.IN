import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { spitiRouteAdvice, spitiRouteSides } from "@/lib/data/spiti";

/**
 * Shimla side against Manali side. A comparison, but deliberately not a table:
 * two cards with the same four labelled rows, side by side from `md` and
 * stacked below it, so nothing ever scrolls sideways on a phone.
 */
export function SpitiRoutes() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          tone="slate"
          eyebrow="Two roads in"
          title="Shimla Side or Manali Side?"
          description="Spiti has two approaches, and they could hardly be more different. Which one you use — and which way round — shapes the whole trip."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {spitiRouteSides.map((side) => (
            <Reveal key={side.id}>
              <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <SmartImage
                    seed={side.imageSeed}
                    sizes="(min-width:768px) 45vw, 92vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-ink-900">{side.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{side.summary}</p>
                  <dl className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
                    {side.facts.map((fact) => (
                      <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] gap-3 py-2.5 text-sm">
                        <dt className="font-semibold text-slate-500">{fact.label}</dt>
                        <dd className="text-ink-800">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl border-l-2 border-slate-400 pl-4 text-base leading-relaxed text-ink-700">
          {spitiRouteAdvice}
        </p>
      </Container>
    </section>
  );
}
