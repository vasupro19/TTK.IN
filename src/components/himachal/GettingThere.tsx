import { ArrowRight, TrainFront } from "lucide-react";
import { gettingThere } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GettingThere() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Getting there"
          title="Planning Your Himachal Trip From Delhi or Chandigarh?"
          description="Almost everyone arrives through one of these two gateways. Here is how each approach actually works."
        />

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gettingThere.map((route) => (
            <article key={`${route.from}-${route.to}`} className="rounded-2xl border border-sand-200 bg-white p-5">
              <p className="flex flex-wrap items-center gap-2 font-display text-base font-bold text-ink-900">
                {route.from}
                <ArrowRight className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {route.to}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                <TrainFront className="h-3.5 w-3.5" aria-hidden="true" />
                {route.mode}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600/80">{route.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-7 rounded-2xl bg-sand-50 p-5 text-sm leading-relaxed text-ink-700">
          <strong className="font-semibold">On journey times:</strong> we deliberately do not publish
          fixed hours for these routes. Mountain driving times swing widely with season, roadworks,
          weather and traffic, and a number on a webpage helps nobody at 11pm on a diversion. Your
          coordinator gives you a realistic window for your actual dates, and your driver adjusts on
          the day.
        </p>
      </Container>
    </section>
  );
}
