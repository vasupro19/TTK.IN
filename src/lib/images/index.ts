/**
 * Image resolution for the whole site.
 *
 * Call sites ask for a *seed* — a stable name for the thing being shown, such
 * as "spiti-1" or "pkg-ladakh-circuit-2" — and never for a URL. Everything
 * about where the bytes come from lives behind this module, so swapping these
 * files for Cloudinary, a hotel API or TheTravelKart's own photography is a
 * change here rather than a change across two hundred components.
 *
 * Resolution order:
 *   1. the generated manifest — an openly-licensed photograph chosen by a
 *      geography-first query chain (see scripts/spec/), stored under public/img
 *   2. a regional stand-in derived from the seed's own name, so an unmapped
 *      Spiti seed still shows Spiti rather than a random landscape
 *   3. a neutral final fallback
 *
 * Nothing here touches the network: the manifest is static data and the
 * photographs are local files.
 */
import { imageManifest, type ResolvedImage } from "./manifest";

export type { ResolvedImage };

/**
 * Regional stand-ins, used only when a seed is missing from the manifest.
 * Ordered most-specific-first so "spiti" wins over the state it sits in.
 */
const PREFIX_FALLBACKS: Array<[string, string]> = [
  ["spiti", "spiti-hero"],
  ["kinnaur", "kinnaur-hero"],
  ["manali", "manali-hero"],
  ["shimla", "shimla-hero"],
  ["dharamshala", "dharamshala-hero"],
  ["dalhousie", "dalhousie-hero"],
  ["kasol", "kasol-hero"],
  ["leh", "leh-hero"],
  ["nubra", "nubra-hero"],
  ["pangong", "pangong-hero"],
  ["ladakh", "region-ladakh-hero"],
  ["srinagar", "srinagar-hero"],
  ["gulmarg", "gulmarg-hero"],
  ["pahalgam", "pahalgam-hero"],
  ["kashmir", "region-kashmir-hero"],
  ["rishikesh", "rishikesh-hero"],
  ["nainital", "nainital-hero"],
  ["mussoorie", "mussoorie-hero"],
  ["auli", "auli-hero"],
  ["uttarakhand", "region-uttarakhand-hero"],
  ["jaipur", "jaipur-hero"],
  ["udaipur", "udaipur-hero"],
  ["jodhpur", "jodhpur-hero"],
  ["jaisalmer", "jaisalmer-hero"],
  ["rajasthan", "region-rajasthan-hero"],
  ["goa", "north-goa-hero"],
  ["munnar", "munnar-hero"],
  ["alleppey", "alleppey-hero"],
  ["kovalam", "kovalam-hero"],
  ["kerala", "region-kerala-hero"],
  ["himachal", "region-himachal-hero"],
];

const LAST_RESORT = "region-himachal-hero";

function fallbackFor(seed: string): ResolvedImage {
  for (const [prefix, target] of PREFIX_FALLBACKS) {
    if (seed.includes(prefix) && imageManifest[target]) {
      return imageManifest[target];
    }
  }
  return imageManifest[LAST_RESORT];
}

/** The full record for a seed: file, descriptive alt, and its credit line. */
export function image(seed: string): ResolvedImage {
  return imageManifest[seed] ?? fallbackFor(seed);
}

/**
 * Path for a seed. `next/image` derives the responsive variants, so callers
 * do not size the source themselves.
 */
export function photo(seed: string): string {
  return image(seed).src;
}

/** Alt text describing what the photograph shows. Never a generic label. */
export function imageAlt(seed: string): string {
  return image(seed).alt;
}

/** True when the seed has its own photograph rather than a stand-in. */
export function isResolved(seed: string): boolean {
  return seed in imageManifest;
}

/** Every photograph in use, for the attribution the CC licences require. */
export function allImageCredits(): Array<ResolvedImage & { seed: string }> {
  return Object.entries(imageManifest)
    .map(([seed, img]) => ({ seed, ...img }))
    .sort((a, b) => a.seed.localeCompare(b.seed));
}
