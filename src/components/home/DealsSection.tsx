import Link from "next/link";
import { getFeaturedDeals } from "@/lib/data/deals";
import { DealCard } from "@/components/cards/DealCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function DealsSection() {
  const deals = getFeaturedDeals(4);
  if (deals.length === 0) return null;

  return (
    <section className="bg-sand-50 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Seasonal rates"
            title="Travel More. Spend Less."
            description="Genuine off-season and early-bird pricing on dates we still have inventory for."
          />
          <Link
            href="/deals"
            className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            See all deals →
          </Link>
        </div>

        <div className="mt-9 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {deals.map((deal, i) => (
            <div key={deal.slug} className="w-[85vw] shrink-0 snap-start sm:w-auto">
              <Reveal delay={i * 60}>
                <DealCard deal={deal} priority={i < 2} />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
