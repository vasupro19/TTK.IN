# Image pipeline

Every photograph on the site is chosen for the place it depicts, not picked from
a generic travel pool. This directory is how that happens.

## Why it exists

A destination card for Spiti should show Spiti; a package covering Shimla and
Manali should show both; a hotel listing should show its town. Generic stock
undermines exactly the trust a travel marketplace is selling, so image choice is
treated as data — versioned, reviewable and regenerable — rather than a URL
pasted into a component.

## The pieces

| File | Role |
| --- | --- |
| `spec/places-*.json` | The place library: for each destination, its state, country and an ordered list of **landmarks** with a search query and hand-written alt text. |
| `spec/seeds-explicit.json` | Query chains for things that are not a destination — regions, hotels, activities, trip categories, vehicles, blog covers. |
| `spec/seeds-hp.json` | The same for the Himachal landing page (things to do, local dishes, trip types). |
| `spec/pins.json` | Exact Commons file names for seeds where search could not do better than something vague or off-topic. Each one was checked by hand. |
| `build-image-spec.py` | Expands all of the above into `image-spec.json`: one entry per image seed used anywhere on the site, holding an ordered chain of queries. |
| `fetch-images.py` | Resolves each seed against Wikimedia Commons and writes `image-manifest.json`. |
| `generate-image-module.py` | Renders the manifest into `src/lib/images/manifest.ts`. |
| `localise-images.mjs` | Downloads each photograph and writes an optimised copy to `public/img/<seed>.webp`. |

## Running it

```bash
npm run images          # the whole chain
npm run images:resolve  # re-resolve and regenerate the TS module only
```

Everything is incremental: API responses are cached under `.image-cache/`, and a
photograph is only re-downloaded when that seed resolves somewhere new.

## How a seed is resolved

1. **Pinned?** Use that exact file.
2. Otherwise walk the seed's query chain, most specific first — landmark, then
   town, then region, then state. A query that returns nothing is progressively
   shortened from the end, which sheds geography qualifiers while keeping the
   subject.
3. Candidates are filtered: large enough to serve, landscape, openly licensed,
   and not a map, diagram, fresco or other non-photograph.
4. **Relevance gate** — the subject must be named in the *file title*, not just
   in its categories. This is what prevents a search for "hill station" matching
   a street in Hong Kong, and it is also what makes the file name trustworthy
   enough to derive alt text from.
5. Geographic accuracy outranks uniqueness: a second photograph of Jibhi beats a
   first photograph of somewhere else, so reuse is allowed before a wrong match.

## Alt text

Alt text is authored per landmark and kept **only** when the resolved file
evidences that landmark. When a seed falls back to a broader query, the alt is
instead derived from the file itself, so the words always describe the picture
on the page. The manifest records which happened (`altSource`).

## Licensing

Sources are Wikimedia Commons under CC BY / CC BY-SA / public domain. Those
licences permit reuse and redistribution but most require attribution, which is
why `/image-credits` exists and is generated from the same manifest. If you
replace these with commissioned or licensed photography, keep `credit`,
`license` and `source` populated and that page keeps working.

## Replacing a bad image

Edit the query in `spec/`, or pin an exact file in `spec/pins.json`, then
`npm run images`. No component changes — call sites only ever name a seed.
