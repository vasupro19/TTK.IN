import Link from "next/link";
import { homeFaqs } from "@/lib/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqJsonLd } from "@/lib/seo";

export function FAQSection() {
  return (
    <section className="bg-sand-50 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Questions, answered"
          title="Before you book"
          description="The things travellers ask us most often, answered honestly."
          className="mx-auto"
        />
        <div className="mt-10">
          <FAQAccordion faqs={homeFaqs} />
        </div>
        <p className="mt-6 text-center text-sm text-ink-600/70">
          Still unsure about something?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
            Ask us directly
          </Link>{" "}
          — we would rather answer it now than after you have paid.
        </p>
      </Container>
    </section>
  );
}
