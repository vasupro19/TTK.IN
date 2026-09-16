#!/usr/bin/env python3
"""Turns image-manifest.json into the typed module the app imports."""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
m = json.load(open(os.path.join(ROOT, "scripts", "image-manifest.json")))

def clean_credit(c):
    c = re.sub(r"\s+", " ", c or "").strip()
    c = re.sub(r"^(User:|user:)", "", c)
    return (c[:78].rstrip() + "…") if len(c) > 80 else c or "Wikimedia Commons contributor"

rows = []
for seed in sorted(m):
    v = m[seed]
    def js(s):
        return json.dumps(s, ensure_ascii=False)
    rows.append(
        f"  {js(seed)}: {{ src: {js('/img/' + seed + '.webp')}, alt: {js(v['alt'])}, "
        f"width: {v.get('localWidth', v['width'])}, height: {v.get('localHeight', v['height'])}, "
        f"credit: {js(clean_credit(v['credit']))}, license: {js(v['license'])}, "
        f"source: {js(v['source'])} }},"
    )

header = '''// ---------------------------------------------------------------------------
// GENERATED FILE — do not edit by hand.
//
// Produced by scripts/fetch-images.py + scripts/generate-image-module.py from
// the query spec in scripts/spec/. Every entry is an openly-licensed photograph
// resolved from Wikimedia Commons by a geography-first query chain, so a card
// for Chandratal shows Chandratal rather than a generic mountain.
//
// To change an image: edit the query in scripts/spec/, then
//   python3 scripts/build-image-spec.py
//   python3 scripts/fetch-images.py
//   python3 scripts/generate-image-module.py
//   node scripts/localise-images.mjs
// ---------------------------------------------------------------------------

/** One resolved photograph, with everything needed to display and credit it. */
export interface ResolvedImage {
  /** Local, pre-optimised asset under public/img. */
  src: string;
  /** Describes what the photograph actually shows. */
  alt: string;
  width: number;
  height: number;
  /** Photographer, for the attribution the CC licences require. */
  credit: string;
  license: string;
  /** Commons file page — the licence and author of record. */
  source: string;
}

export const imageManifest: Record<string, ResolvedImage> = {
'''

out = os.path.join(ROOT, "src/lib/images/manifest.ts")
with open(out, "w") as f:
    f.write(header + "\n".join(rows) + "\n};\n")
print(f"wrote {out} ({len(rows)} images)")
