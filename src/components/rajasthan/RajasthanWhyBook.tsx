import { rajasthanWhyChoose } from "@/lib/data/rajasthan";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RajasthanWhyBook() {
  return (
    <section className="border-y border-sandstone-200 bg-sandstone-50 py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          tone="desert"
          eyebrow="Why us"
          title="Why Book Your Rajasthan Trip With TheTravelKart?"
          description="A Rajasthan trip is more than a list of forts. We plan the route, stays and travel time around how you actually want to experience it."
          className="mx-auto"
        />

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rajasthanWhyChoose.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="h-full rounded-2xl border border-sandstone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sandstone-300 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sandstone-100 text-terracotta-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600/80">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
