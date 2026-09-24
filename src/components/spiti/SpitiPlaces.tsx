import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { spitiPlaces } from "@/lib/data/spiti";

/** The places people actually ask about, each with a photograph of itself. */
export function SpitiPlaces() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          tone="slate"
          eyebrow="Along the way"
          title="What You Will See in Spiti"
          description="Monasteries, high villages and one very cold lake — most of them a short drive from Kaza."
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {spitiPlaces.map((place) => (
            <li key={place.name} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage
                  seed={place.imageSeed}
                  sizes="(min-width:1024px) 22vw, (min-width:480px) 45vw, 92vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-ink-900">{place.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600/80">{place.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
