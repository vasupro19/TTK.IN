import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { EnquiryButton } from "@/components/lead/EnquiryModal";
import { whatsappLink } from "@/lib/seo";

/**
 * The personal ask, straight after the packages: a photograph of the road on
 * one side and a short, direct note on the other. Stacks on phones with the
 * image on top, cropped short so the buttons stay near the fold.
 */
export function SpitiCustomTrip() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="grid overflow-hidden rounded-3xl bg-slate-900 text-white lg:grid-cols-2">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[380px]">
            <SmartImage
              seed="sp-cta"
              sizes="(min-width:1024px) 50vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              Your Spiti. Your Route. Your Pace.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Want to stay longer in Kaza? Add Chandratal? Start from Shimla? Finish in Manali? Tell
              us what you have in mind and we&apos;ll build the route around you.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <EnquiryButton className="rounded-full bg-sunset-500 px-7 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-sunset-600">
                Build My Spiti Trip
              </EnquiryButton>
              <a
                href={whatsappLink(
                  "Hi TheTravelKart, I have a Spiti route in mind and would like help planning it.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
