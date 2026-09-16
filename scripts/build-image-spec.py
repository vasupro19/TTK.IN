#!/usr/bin/env python3
"""
Builds the image query spec: every image seed used on the site -> an ordered
chain of geographically specific search queries, plus the alt text that will
describe whatever comes back.

Query chains follow the fallback hierarchy in AGENTS/brief section 38:
  exact landmark -> city -> region -> state -> country
so a seed never silently drops to a generic "travel" photo while a more
specific query is still untried.

Output: scripts/image-spec.json  (consumed by fetch-images.py)
"""
import hashlib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC_DIR = os.path.join(ROOT, "scripts", "spec")

def load(name):
    with open(os.path.join(SPEC_DIR, name)) as f:
        return json.load(f)

places = {}
for part in ("places-1.json", "places-2.json", "places-3.json", "places-4.json"):
    places.update(load(part))
explicit = load("seeds-explicit.json")
explicit.update(load("seeds-hp.json"))

# Seed prefixes that differ from the destination slug they describe.
ALIAS = {
    "spiti": "spiti-valley",
    "tirthan": "tirthan-valley",
    "nubra": "nubra-valley",
    "pangong": "pangong-tso",
    "singapore": "singapore-city",
}

def place_for(prefix):
    return places.get(ALIAS.get(prefix, prefix))

def chain(place, landmark_idx):
    """Landmark query first, then progressively broader geography."""
    lm = place["landmarks"][landmark_idx % len(place["landmarks"])]
    broader = [
        f'{place["name"]} {place["area"]} {place["country"]}',
        f'{place["area"]} {place["country"]} landscape',
    ]
    return {"queries": [lm["q"]] + broader, "alt": lm["alt"]}

spec = {}

# ---- destinations: <prefix>-hero, <prefix>-1..3 ---------------------------
prefixes = [k for k in places if k not in ALIAS.values()] + list(ALIAS.keys())
for prefix in prefixes:
    p = place_for(prefix)
    if not p:
        continue
    spec[f"{prefix}-hero"] = chain(p, 0)
    for i in (1, 2, 3):
        spec[f"{prefix}-{i}"] = chain(p, i)

# ---- packages: images follow the actual route cities ----------------------
# routeCities are display names; map them back to place keys.
NAME_TO_KEY = {p["name"].lower(): k for k, p in places.items()}
NAME_TO_KEY.update({
    "havelock island": "havelock",
    "malé atoll": "male-atoll",
    "male atoll": "male-atoll",
    "singapore city": "singapore-city",
    "spiti valley": "spiti-valley",
    "nubra valley": "nubra-valley",
    "pangong tso": "pangong-tso",
    "neil island": "neil-island",
    "baa atoll": "baa-atoll",
    "abu dhabi": "abu-dhabi",
    "north goa": "north-goa",
    "south goa": "south-goa",
    "bir billing": "bir-billing",
    "tirthan valley": "tirthan-valley",
    "kheerganga": "kheerganga",
    "amritsar": "amritsar",
    "chandigarh": "chandigarh",
})

pkg_src = open(os.path.join(ROOT, "src/lib/data/packages.ts")).read()
pkg_count = 0
for block in re.split(r"\n  \{\n", pkg_src)[1:]:
    seed_m = re.search(r'imageSeed: "([^"]+)"', block)
    route_m = re.search(r"routeCities: \[([^\]]*)\]", block)
    if not seed_m or not route_m:
        continue
    base = seed_m.group(1)
    gallery_m = re.search(r"gallerySeeds: \[([^\]]*)\]", block)
    seeds = [seed_m.group(1)] + (
        re.findall(r'"([^"]+)"', gallery_m.group(1)) if gallery_m else []
    )
    cities = [c.strip().strip('"') for c in route_m.group(1).split(",") if c.strip()]
    keys = [NAME_TO_KEY.get(c.lower()) for c in cities]
    keys = [k for k in keys if k and k in places]
    if not keys:
        print(f"  !! package {base}: no place match for {cities}", file=sys.stderr)
        continue
    # Round-robin the route so a multi-city package shows every city it visits,
    # rather than four photographs of the first stop. The per-package offset
    # stops every Shimla-first itinerary from opening on the same landmark —
    # without it, three different cards all led with the Ridge library.
    # CRC32's low bits collide badly across similar slugs — three Shimla
    # packages all landed on the same landmark. SHA-1 spreads them.
    offset = int(hashlib.sha1(base.encode()).hexdigest()[:8], 16)
    for n, seed in enumerate(seeds):
        key = keys[n % len(keys)]
        idx = n // len(keys) + offset
        spec[seed] = chain(places[key], idx)
    pkg_count += 1

# ---- everything else: explicitly authored ---------------------------------
for seed, e in explicit.items():
    spec[seed] = {"queries": [e["q"]] + e.get("fallback", []), "alt": e["alt"]}

with open(os.path.join(ROOT, "scripts", "image-spec.json"), "w") as f:
    json.dump(spec, f, indent=2, ensure_ascii=False)

print(f"places={len(places)} packages={pkg_count} seeds={len(spec)}")
