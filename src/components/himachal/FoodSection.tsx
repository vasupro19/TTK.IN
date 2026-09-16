import { himachaliFood } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function FoodSection() {
  const [hero, ...rest] = himachaliFood;

  return (
    <section className="bg-ink-900 py-14 text-white sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Himachali food"
          title="Taste Himachal"
          description="Beyond the Maggi points — the food that actually comes out of Himachali kitchens."
          className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:bg-white/10 [&_span]:text-brand-200"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Lead dish gets the large tile. */}
          <article className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl lg:row-span-2 lg:min-h-full">
            {/* REPLACE: food photography */}
            <SmartImage
              seed={hero.imageSeed}
              loading="lazy"
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
            <div className="relative p-6">
              <h3 className="font-display text-2xl font-bold">{hero.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{hero.body}</p>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            {rest.map((dish) => (
              <article
                key={dish.name}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/20"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  {/* REPLACE: food photography */}
                  <SmartImage
                    seed={dish.imageSeed}
                    loading="lazy"
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold">{dish.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{dish.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
