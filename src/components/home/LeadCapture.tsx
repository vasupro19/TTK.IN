import { Phone, MessageCircle, Clock } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";

export function LeadCapture() {
  return (
    <section id="plan" className="bg-sand-50 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:pt-6">
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Free trip planning
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Tell Us Where You Want To Go
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600/80">
              Give us the rough shape of your trip — dates, who is travelling and a budget range.
              A travel expert reads it personally and comes back with a real itinerary and named
              hotels, not a brochure.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">A reply within working hours</p>
                  <p className="text-sm text-ink-600/70">
                    Not an auto-responder — the person who will plan your trip.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Everything on WhatsApp</p>
                  <p className="text-sm text-ink-600/70">
                    Quote, itinerary, hotel photos and driver details in one thread.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Rather just talk?</p>
                  <p className="text-sm text-ink-600/70">
                    <a href={telLink()} className="font-semibold text-brand-700 hover:underline">
                      {siteConfig.phoneDisplay}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={telLink(siteConfig.altPhoneRaw)}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      {siteConfig.altPhoneDisplay}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
