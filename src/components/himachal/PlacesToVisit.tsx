import Image from "next/image";
import Link from "next/link";
import { Check, CalendarDays, Clock, Users } from "lucide-react";
import { destinationGuides } from "@/lib/data/himachal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-brand-600">{icon}</span>
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-600/55">
          {label}
        </span>
        <span className="mt-0.5 block text-sm text-ink-800">{value}</span>
      </span>
    </div>
  );
}

export function PlacesToVisit() {
  return (
    <section id="places" className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Destination guide"
          title="Top Places to Visit in Himachal Pradesh"
          description="What each place is actually good for, how long to give it, and when to go."
        />

        <div className="mt-10 space-y-6">
          {destinationGuides.map((place, i) => (
            <article
              key={place.slug}
              className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-sand-200 bg-white lg:grid-cols-[320px_1fr]"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[260px]">
                {/* REPLACE: destination photography */}
                <Image
                  src={place.image}
                  alt={`${place.name}, Himachal Pradesh`}
                  fill
                  loading={i < 2 ? undefined : "lazy"}
                  sizes="(min-width:1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                  {place.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{place.whyVisit}</p>

                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-sand-200 pt-5 sm:grid-cols-3">
                  <Meta icon={<Users className="h-4 w-4" />} label="Best for" value={place.bestFor} />
                  <Meta icon={<CalendarDays className="h-4 w-4" />} label="Best time" value={place.bestTime} />
                  <Meta icon={<Clock className="h-4 w-4" />} label="Ideal stay" value={place.idealDuration} />
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-600/55">
                    Top experiences
                  </p>
                  <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {place.experiences.map((exp) => (
                      <li key={exp} className="flex items-start gap-2 text-sm text-ink-700">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href={`/destinations/${place.slug}`}
                    className="rounded-full border border-sand-200 px-4 py-2 text-xs font-semibold text-ink-800 transition-colors hover:bg-sand-50"
                  >
                    {place.name} guide
                  </Link>
                  <Link
                    href={`/packages?destination=${place.slug}`}
                    className="rounded-full bg-brand-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    See packages
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
