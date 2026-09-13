import { tripTypeCategories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function TripTypes() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Browse by trip type"
          title="Every kind of trip, planned properly"
          description="The same care goes into a two-night weekend as into a three-week honeymoon."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tripTypeCategories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 50}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
