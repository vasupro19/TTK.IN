import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { photo } from "@/lib/images";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TheTravelKart is a team of travel consultants building transparent, handcrafted holiday packages across India and abroad since 2019.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Transparent pricing",
    description: "Every rupee in the price breakdown is itemised — no hidden convenience fees at checkout.",
  },
  {
    title: "Consultants, not call-centre scripts",
    description: "Your trip is planned by someone who has actually been to (or thoroughly researched) the destination.",
  },
  {
    title: "Built for real Indian travellers",
    description: "Vegetarian meal plans, family-room configurations, and visa timelines that fit Indian passports.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="relative flex h-[300px] items-end overflow-hidden sm:h-[380px]">
        <Image
          src={photo("about-hero", 1920, 900)}
          alt="TheTravelKart team planning a trip"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
        <Container className="relative pb-8 text-white">
          <h1 className="font-display text-3xl font-extrabold sm:text-5xl">
            About {siteConfig.name}
          </h1>
          <p className="mt-2 max-w-xl text-white/85">{siteConfig.tagline}</p>
        </Container>
      </section>

      <Container className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink-900">Our story</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-700">
          <p>
            TheTravelKart started in 2019 with a simple frustration: booking a holiday package
            online meant either a generic, one-size-fits-all itinerary or an offline travel agent
            who was hard to reach once the advance was paid.
          </p>
          <p>
            We built TheTravelKart to sit in between — the convenience of browsing and comparing
            packages online, backed by a real travel consultant who stays reachable on WhatsApp for
            the entire length of your trip. Every package on this site has been personally
            itemised by someone on our team, down to which room category and which specific
            activities are included.
          </p>
          <p>
            Today we curate packages across {`14+`} destinations in India and abroad, work with a
            vetted network of hotels and local operators, and handle everything from a weekend
            Goa trip to a two-week honeymoon circuit.
          </p>
        </div>
      </Container>

      <Container className="mt-14">
        <SectionHeading eyebrow="What we stand for" title="How we're different" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-sand-200 bg-white p-6">
              <h3 className="text-base font-bold text-ink-900">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600/75">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-14">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-brand-700 p-10 text-center text-white">
          <h2 className="font-display text-2xl font-bold">Ready to plan your next trip?</h2>
          <p className="max-w-md text-white/80">
            Tell us your dates and budget — we&apos;ll take it from there.
          </p>
          <Button href="/contact" variant="primary">
            Get in touch
          </Button>
        </div>
      </Container>
    </div>
  );
}
