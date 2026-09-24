import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { rajasthanGuide, rajasthanGuideIntro } from "@/lib/data/rajasthan";

/**
 * Long-form guide for search. Sits below the proof sections so it never stands
 * between a visitor and the quote, and is plain server-rendered HTML — no
 * accordions hiding the text, no client JavaScript.
 */
export function RajasthanGuide() {
  return (
    <section
      aria-labelledby="rajasthan-guide"
      className="border-t border-sandstone-200 bg-sandstone-50 py-14 sm:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-block rounded-full bg-sandstone-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-700">
              Planning guide
            </span>
            <h2
              id="rajasthan-guide"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
            >
              Rajasthan Tour Packages
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">{rajasthanGuideIntro}</p>

            <div className="mt-8 hidden grid-cols-2 gap-3 lg:grid">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <SmartImage
                  seed="pkg-udaipur-royal-1"
                  sizes="(min-width:1280px) 240px, 20vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl">
                <SmartImage
                  seed="jaisalmer-3"
                  sizes="(min-width:1280px) 240px, 20vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-9">
            {rajasthanGuide.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-24">
                <h3 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                  {section.heading}
                </h3>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((text) => (
                    <p key={text.slice(0, 40)} className="text-[15px] leading-relaxed text-ink-700">
                      {text}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
