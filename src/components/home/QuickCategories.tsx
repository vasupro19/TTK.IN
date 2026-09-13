import { quickCategories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function QuickCategories() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Start with a mood"
          title="What kind of trip is this?"
          description="Tell us the occasion and we will shape the route, the pace and the stays around it."
        />

        {/* Horizontal rail on mobile, grid from tablet up. */}
        <div className="mt-9 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {quickCategories.map((category, i) => (
            <div key={category.slug} className="w-44 shrink-0 snap-start sm:w-auto">
              <CategoryCard category={category} priority={i < 3} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
