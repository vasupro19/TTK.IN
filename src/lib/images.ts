/**
 * Image resolution for the whole site.
 *
 * `photo(seed)` normally returns a deterministic *random* placeholder, which is
 * fine for filler but occasionally lands on something absurd for a travel site
 * (footwear, office desks, brutalist car parks). Any seed listed in `PINNED`
 * is instead resolved to a specific, hand-checked photograph.
 *
 * Pin a seed whenever the random draw is wrong for the context. When real
 * photography is ready, point `photo()` at the DAM/CDN and delete this map —
 * every call site stays unchanged.
 */

/** Seed → picsum photo id, each one visually checked before being pinned. */
const PINNED: Record<string, number> = {
  // Manali — Himalayan Escape (snow points, Solang, river rafting)
  "pkg-manali-escape": 29, // snow-capped range
  "pkg-manali-escape-1": 28, // forested river gorge
  "pkg-manali-escape-2": 17, // pine meadow trail
  "pkg-manali-escape-3": 15, // waterfall over rocks

  // Manali — Honeymoon Bliss (soft, quiet, valley light)
  "pkg-manali-honeymoon": 11, // misty valley meadow
  "pkg-manali-honeymoon-1": 70, // tree-lined avenue in mist
  "pkg-manali-honeymoon-2": 93, // dusk meadow and pines
};

export function photo(seed: string, width = 1200, height = 800): string {
  const pinned = PINNED[seed];
  if (pinned !== undefined) {
    return `https://picsum.photos/id/${pinned}/${width}/${height}`;
  }
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

/** True when a seed has been curated rather than left to the random pool. */
export function isPinned(seed: string): boolean {
  return seed in PINNED;
}
