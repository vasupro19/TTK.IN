import { MessageCircle, Clock, PencilRuler, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";

const WA_MESSAGE =
  "Hi TheTravelKart, I want to enquire about a Himachal Pradesh tour package.";

/**
 * Closing call to action.
 *
 * There is no form on the page itself — every "Get Free Quote" opens the
 * shared dialog instead. A long form sitting in the page asks people to commit
 * before they have decided to; a button asks them to decide first, and the
 * dialog that follows contains nothing but the four questions.
 */
export function EnquirySection() {
  return (
    <section id="enquiry" className="scroll-mt-24 bg-ink-900 py-16 text-white sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200">
            Free trip planning
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Your Himachal Trip Starts Here
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Tell us your dates, budget and travel preferences. Our travel experts will help you
            plan the right Himachal itinerary — with named hotels and a real day-by-day plan.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <EnquiryButton className="w-full rounded-full bg-sunset-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sunset-500/20 transition-colors hover:bg-sunset-600 sm:w-auto">
              Get Free Quote
            </EnquiryButton>
            <a
              href={whatsappLink(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#1da851] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <p className="mt-6 text-sm text-white/60">
            Or call{" "}
            <a href={telLink()} className="font-semibold text-white hover:underline">
              {siteConfig.phoneDisplay}
            </a>{" "}
            /{" "}
            <a
              href={telLink(siteConfig.altPhoneRaw)}
              className="font-semibold text-white hover:underline"
            >
              {siteConfig.altPhoneDisplay}
            </a>
          </p>

          <ul className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">A reply within a working day</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Read by a person, not an autoresponder.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <PencilRuler className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">A real itinerary, not a brochure</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Named hotels, day-by-day routes and honest drive times.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Nothing to pay to enquire</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  You see the full plan and price before anything is booked.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
