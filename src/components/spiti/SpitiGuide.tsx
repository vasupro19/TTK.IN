import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { spitiFaqs, spitiGuide, spitiGuideIntro } from "@/lib/data/spiti";

/**
 * Practical information: the long-form guide, then the short questions people
 * ask on WhatsApp. The guide is plain server-rendered HTML; only the FAQ
 * accordion ships JavaScript, and it is the site's existing component.
 */
export function SpitiGuide() {
  return (
    <>
      <section
        aria-labelledby="spiti-guide"
        className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20"
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
                Planning guide
              </span>
              <h2
                id="spiti-guide"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
              >
                Spiti Valley Tour Packages
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700">{spitiGuideIntro}</p>
              <nav aria-label="In this guide" className="mt-6 hidden lg:block">
                <ul className="space-y-1.5 text-sm">
                  {spitiGuide.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="text-slate-600 hover:text-ink-900">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="space-y-9">
              {spitiGuide.map((section) => (
                <article key={section.id} id={section.id} className="scroll-mt-28">
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

      <section aria-labelledby="spiti-faq" className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2
              id="spiti-faq"
              className="text-center font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl"
            >
              Spiti Questions We Get Asked
            </h2>
            <div className="mt-8">
              <FAQAccordion faqs={spitiFaqs} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
