import { MessageCircle, Phone, Mail, Globe, Route, Car, Headset, Shuffle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuickLeadForm } from "@/components/lead/QuickLeadForm";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";
import { SPITI_WA_MESSAGE, spitiFormOptions } from "@/lib/data/spiti";

const TRUST = [
  { icon: Route, label: "Customized itineraries" },
  { icon: Car, label: "Private SUV options" },
  { icon: Headset, label: "Real travel assistance" },
  { icon: Shuffle, label: "Flexible route planning" },
];

/**
 * Closing section with the form in the page, not behind a button: by this
 * point the visitor has read the routes and the practical detail, and the
 * questions (starting city, route) only make sense having done so. The form is
 * the same QuickLeadForm the dialog uses, with the Spiti trip fields switched
 * on. `id="enquiry"` is what the mobile bottom bar watches to step aside.
 */
export function SpitiEnquiry() {
  return (
    <section id="enquiry" className="scroll-mt-24 bg-slate-900 py-16 text-white sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Free trip planning
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Ready for Spiti? Let&apos;s Plan the Route.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Tell us your travel dates, starting point, group size and the places you want to
              experience. We&apos;ll help you build a practical Spiti itinerary around your trip.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-white/85">
                  <Icon className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(SPITI_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#1da851] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </a>

            <ul className="mt-8 space-y-2.5 text-sm text-white/70">
              <li className="flex flex-wrap items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
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
                <Mail className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white hover:underline">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                {siteConfig.domain}
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-2xl sm:p-8">
            <h3 className="font-display text-xl font-extrabold">Get Free Quote</h3>
            <p className="mt-1 text-sm text-ink-600/75">
              A few details and a travel expert will call you back with a route.
            </p>
            <div className="mt-6">
              <QuickLeadForm destination="Spiti Valley" idPrefix="sp-form" options={spitiFormOptions} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
