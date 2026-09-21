import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Accreditation marks for the footer.
 *
 * These are trust marks, not advertising: small, one consistent height, evenly
 * spaced, and quiet enough that they sit under the contact details rather than
 * competing with them.
 *
 * DROPPING IN THE REAL ARTWORK
 * ----------------------------
 * We do not have the official files yet, and we do not draw substitutes — an
 * invented NIDHI or TAAI mark is a false claim of accreditation, not a design
 * decision. Until the client supplies them each entry renders as a plain
 * wordmark in the same tile the logo will occupy, so the layout is already
 * final.
 *
 * To switch one over: put the official file in `public/img/trust/` and add its
 * `logo` below with the artwork's real intrinsic size. Nothing else changes.
 */
type TrustMark = {
  /** What the tile shows until the artwork arrives. */
  name: string;
  /** The full, accurate name of the body — read out to screen readers. */
  full: string;
  logo?: { src: string; width: number; height: number };
};

const TRUST_MARKS: TrustMark[] = [
  { name: "NIDHI", full: "NIDHI — Ministry of Tourism, Government of India" },
  {
    name: "Himachal Tourism",
    full: "Department of Tourism, Government of Himachal Pradesh",
  },
  { name: "MSME", full: "MSME — Udyam registered" },
  { name: "TAAI", full: "TAAI — Travel Agents Association of India" },
];

export function TrustMarks({ className }: { className?: string }) {
  return (
    <section className={cn(className)} aria-labelledby="footer-trust-marks">
      <h3
        id="footer-trust-marks"
        className="text-xs font-bold uppercase tracking-[0.14em] text-white/45"
      >
        Trusted &amp; Registered With
      </h3>

      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:max-w-3xl">
        {TRUST_MARKS.map((mark) => (
          <li
            key={mark.name}
            className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-center"
          >
            {mark.logo ? (
              <Image
                src={mark.logo.src}
                alt={mark.full}
                width={mark.logo.width}
                height={mark.logo.height}
                className="h-9 w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/70 sm:text-xs">
                {mark.name}
                <span className="sr-only"> — {mark.full}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
