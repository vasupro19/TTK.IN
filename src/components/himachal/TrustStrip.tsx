import { trustPoints } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { Icon } from "./Icon";

export function TrustStrip() {
  return (
    <section className="border-b border-sand-200 bg-sand-50 py-5">
      <Container>
        <ul className="flex snap-x snap-mandatory gap-x-8 gap-y-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible lg:gap-x-10">
          {trustPoints.map((point) => (
            <li
              key={point.label}
              className="flex shrink-0 snap-start items-center gap-2 text-sm font-medium text-ink-800"
            >
              <Icon name={point.icon} className="h-4 w-4 shrink-0 text-brand-600" />
              {point.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
