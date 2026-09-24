import { whyChoose } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/landing/Icon";

export function WhyBook() {
  return (
    <section className="bg-sand-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why us"
          title="Why Book Your Himachal Trip With TheTravelKart?"
          description="We live here. That is most of the answer."
          className="mx-auto"
        />

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-sand-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
