import { MessageCircle, Clock, PencilRuler, ShieldCheck, Phone, Mail, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";
import { RAJASTHAN_WA_MESSAGE } from "@/lib/data/rajasthan";

/**
 * Closing call to action. Like the Himachal page there is no in-page form —
 * "Get Free Quote" opens the shared four-question dialog. `id="enquiry"` is
 * what the mobile bottom bar watches to step out of the way.
 */
export function RajasthanEnquiry() {
  return (
    <section id="enquiry" className="scroll-mt-24 bg-jodhpur-900 py-16 text-white sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sandstone-200">
            Free trip planning
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Your Rajasthan Trip Starts Here
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Tell us your dates, budget and travel preferences. Our travel experts will help you
            build a Rajasthan itinerary with the right hotels, route and private transport.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <EnquiryButton className="w-full rounded-full bg-sunset-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sunset-500/20 transition-colors hover:bg-sunset-600 sm:w-auto">
              Get Free Quote
            </EnquiryButton>
            <a
              href={whatsappLink(RAJASTHAN_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#1da851] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <ul className="mt-7 flex flex-col items-center justify-center gap-x-6 gap-y-2.5 text-sm text-white/70 sm:flex-row sm:flex-wrap">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-sandstone-300" aria-hidden="true" />
              <a href={telLink()} className="font-semibold text-white hover:underline">
                {siteConfig.phoneDisplay}
              </a>
              <span aria-hidden="true">/</span>
              <a
                href={telLink(siteConfig.altPhoneRaw)}
                className="font-semibold text-white hover:underline"
              >
                {siteConfig.altPhoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-sandstone-300" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-sandstone-300" aria-hidden="true" />
              {siteConfig.domain}
            </li>
          </ul>

          <ul className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-sandstone-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">A reply within a working day</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Read by a person, not an autoresponder.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <PencilRuler className="mt-0.5 h-5 w-5 shrink-0 text-sandstone-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">A real itinerary, not a brochure</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Hotels, day-by-day routes and honest drive times.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sandstone-300" aria-hidden="true" />
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
