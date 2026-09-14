import { seasons } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const toneStyles: Record<string, string> = {
  spring: "border-t-emerald-400",
  summer: "border-t-amber-400",
  monsoon: "border-t-sky-400",
  autumn: "border-t-orange-400",
  winter: "border-t-slate-400",
};

export function SeasonSection() {
  return (
    <section id="best-time" className="scroll-mt-24 bg-sand-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="When to go"
          title="Best Time to Visit Himachal Pradesh"
          description="There is no single best month — it depends whether you want snow, clear views, blossom or low rates."
          className="mx-auto"
        />

        {/* Visual timeline */}
        <div className="mt-10 hidden items-center gap-1 lg:flex" aria-hidden="true">
          {seasons.map((season) => (
            <div key={season.slug} className="flex-1">
              <div className={cn("h-1.5 rounded-full", toneStyles[season.tone].replace("border-t-", "bg-"))} />
              <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-600/60">
                {season.months}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {seasons.map((season) => (
            <article
              key={season.slug}
              className={cn(
                "flex h-full flex-col rounded-2xl border border-sand-200 border-t-4 bg-white p-5",
                toneStyles[season.tone]
              )}
            >
              <h3 className="font-display text-lg font-bold text-ink-900">{season.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600/55">
                {season.months}
              </p>
              <p className="mt-3 text-sm font-semibold text-ink-800">{season.headline}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600/80">{season.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-sand-200 pt-3">
                {season.goodFor.map((g) => (
                  <li key={g} className="rounded-full bg-sand-100 px-2 py-0.5 text-[11px] font-medium text-ink-700">
                    {g}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-relaxed text-ink-600/65">
          Mountain weather does not follow a calendar. Pass openings, snowfall and road conditions
          vary year to year — we confirm what is actually realistic for your dates before you book.
        </p>
      </Container>
    </section>
  );
}
