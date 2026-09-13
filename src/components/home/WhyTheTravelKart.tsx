import { BadgeCheck, ReceiptIndianRupee, Car, PencilRuler, Headset, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Verified Hotels",
    body: "We have stayed in or inspected the properties we sell. If a hotel slips, it comes off the list.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Transparent Pricing",
    body: "One figure, itemised. Permits, tolls and driver allowance are in the quote, not sprung on you later.",
  },
  {
    icon: Car,
    title: "Experienced Drivers",
    body: "Hill routes are driven by people who know them in every season — papers and licences checked.",
  },
  {
    icon: PencilRuler,
    title: "Custom Itineraries",
    body: "Every package is a starting point. Move a night, skip a stop, add a day — the plan bends to you.",
  },
  {
    icon: Headset,
    title: "24/7 Trip Support",
    body: "A real coordinator on WhatsApp from the day you enquire until the day you are home.",
  },
  {
    icon: Lock,
    title: "Secure Booking",
    body: "Payments through verified gateways, written confirmations, and a clear cancellation policy.",
  },
];

export function WhyTheTravelKart() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why travellers pick us"
          title="A travel company, not a booking form"
          description="TheTravelKart is small on purpose — you speak to the person who planned your trip."
        />

        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className="h-full rounded-2xl border border-sand-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600/75">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
