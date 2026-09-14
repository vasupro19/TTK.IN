import Link from "next/link";
import { himachalFaqs } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export function HimachalFAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-14 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Questions, answered"
          title="Himachal Tour Packages — FAQs"
          description="The things travellers ask us most, answered honestly."
          className="mx-auto"
        />
        <div className="mt-9">
          <FAQAccordion faqs={himachalFaqs} />
        </div>
        <p className="mt-6 text-center text-sm text-ink-600/70">
          Something not covered here?{" "}
          <Link href="#enquiry" className="font-semibold text-brand-700 hover:underline">
            Ask us directly
          </Link>{" "}
          — we would rather answer it now than after you have paid.
        </p>
      </Container>
    </section>
  );
}
