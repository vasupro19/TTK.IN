import Image from "next/image";
import { thingsToDo } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "./Icon";

export function ThingsToDo() {
  return (
    <section id="things-to-do" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Experiences"
          title="Things To Do In Himachal Pradesh"
          description="What is actually worth your time, and where each is genuinely good."
        />

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {thingsToDo.map((thing, i) => (
            <article
              key={thing.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* REPLACE: activity photography */}
                <Image
                  src={thing.image}
                  alt={`${thing.name} in Himachal Pradesh`}
                  fill
                  loading={i < 3 ? undefined : "lazy"}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-brand-700 backdrop-blur-sm">
                  <Icon name={thing.icon} className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-bold text-ink-900">{thing.name}</h3>
                <p className="mt-1 text-xs font-medium text-brand-700">{thing.where}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600/80">{thing.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
