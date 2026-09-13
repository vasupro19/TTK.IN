import { Phone } from "lucide-react";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";

/**
 * Persistent contact affordances. WhatsApp shows everywhere; the call button
 * is mobile-only, where tapping a number actually dials. Both sit above the
 * sticky booking bar on package pages (which uses z-30).
 */
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={telLink()}
        aria-label={`Call TheTravelKart on ${siteConfig.phoneDisplay}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-lg shadow-ink-900/15 ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with TheTravelKart on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-lg shadow-[#25D366]/30 transition-all hover:pr-5 active:scale-95 sm:py-4 sm:pl-4"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
          <path d="M17.47 14.38c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5-.17-.01-.37-.01-.56-.01s-.51.07-.78.37c-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.2 3.01c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.71-.7 1.96-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.86.5 3.6 1.36 5.1L2 22l5.13-1.44a9.9 9.9 0 0 0 4.9 1.3h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.1h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.05.86.82-2.97-.2-.31a8.13 8.13 0 0 1-1.25-4.44c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 0 1 2.39 5.76c0 4.5-3.67 8.19-8.16 8.19z" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
          Chat with an expert
        </span>
      </a>
    </div>
  );
}
