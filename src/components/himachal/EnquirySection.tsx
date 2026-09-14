import { Phone, MessageCircle, Clock, PencilRuler, ShieldCheck } from "lucide-react";
import { HimachalEnquiryForm } from "./HimachalEnquiryForm";
import { Container } from "@/components/ui/Container";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";

const WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Himachal Pradesh tour package.";

export function EnquirySection() {
  return (
    <section id="enquiry" className="scroll-mt-24 bg-sand-50 py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Free trip planning
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Get a Free Himachal Quote
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600/80">
              Tell us your dates, who is travelling and a rough budget. A Himachal travel expert
              reads every enquiry personally and comes back with a real day-by-day itinerary and
              named hotels — not a brochure.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">A reply within working hours</p>
                  <p className="text-sm text-ink-600/70">From the person who will plan your trip.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PencilRuler className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Built around your dates</p>
                  <p className="text-sm text-ink-600/70">
                    Not a fixed departure you have to fit into.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">No payment to enquire</p>
                  <p className="text-sm text-ink-600/70">
                    You see the full itinerary and hotel names before anything is booked.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-sand-200 bg-white p-5">
              <p className="text-sm font-bold text-ink-900">Prefer to talk?</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a href={telLink()} className="flex items-center gap-2 rounded-full border border-sand-200 px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-sand-50">
                  <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </a>
                <a href={telLink(siteConfig.altPhoneRaw)} className="flex items-center gap-2 rounded-full border border-sand-200 px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:bg-sand-50">
                  <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {siteConfig.altPhoneDisplay}
                </a>
                <a href={whatsappLink(WA_MESSAGE)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
            <HimachalEnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
