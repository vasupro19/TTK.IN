#!/usr/bin/env python3
"""
Resolves every seed in image-spec.json to a real, openly-licensed photograph
from Wikimedia Commons, and writes scripts/image-manifest.json.

Why Commons: it is properly licensed for reuse (CC / public domain), it carries
machine-readable attribution, and — the part that matters for this site — it
actually has photographs of Chandratal, Key Monastery, Pangong Tso and the rest,
rather than interchangeable "mountain" stock.

Quality gates, in order:
  1. hard filters   - bitmap, big enough, landscape, not a map/diagram/logo
  2. relevance gate - the file's title or categories must contain a distinctive
                      token from the query, so an off-topic search result is
                      dropped rather than accepted just because it ranked first
  3. global dedupe  - no photograph is used twice anywhere on the site

Re-running is cheap: raw API responses are cached under scripts/.image-cache/.
"""
import json, os, re, sys, time, hashlib, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "scripts", ".image-cache")
SPEC_DIR = os.path.join(ROOT, "scripts", "spec")
os.makedirs(CACHE, exist_ok=True)

API = "https://commons.wikimedia.org/w/api.php"
UA = "TheTravelKart-image-builder/1.0 (https://thetravelkart.in; thetravelkart@gmail.com)"
THUMB_W = 1920

# Files that are technically photographs but useless as travel imagery.
BAD_TITLE = re.compile(
    r"\b(map|karte|diagram|chart|logo|coat of arms|flag|seal|emblem|signature|"
    r"banner|icon|poster|panorama|stamp|coin|banknote|plaque|sign|signboard|"
    r"schematic|graph|timeline|screenshot|book|cover|portrait of|painting|"
    r"drawing|sketch|engraving|lithograph|manuscript|document|certificate|"
    r"fresco|mural|carving|relief|statue of|bust of|inscription|"
    r"school|hospital|election|protest|minister|parliament|factory|cemetery|"
    r"funeral|accident|garbage|landfill|slum|roadkill|carcass|dead|waste|"
    r"tsunami|earthquake|flood|fire|riot|war|memorial|grave|empire|"
    r"vampire|autopsy|surgery|injury|weapon|gun|airport|campus|university|"
    r"college|rescue|training|fun run|modellino|scale model|mockup|"
    r"parking|restaurant|menu|dish|shop|market stall|advertisement|"
    r"number plate|licence plate|dashboard|interior of)\b",
    re.I,
)
STOPWORDS = {
    "the", "a", "an", "of", "in", "at", "on", "and", "india", "view", "landscape",
    "travel", "tourism", "beautiful", "near", "from", "with", "over",
}

def norm(u):
    u = u.replace("//thumb.wikimedia.org/", "//upload.wikimedia.org/")
    return u.split("?")[0]

def api(params):
    """GET with an on-disk cache keyed by the exact parameter set."""
    qs = urllib.parse.urlencode(params)
    key = hashlib.sha1(qs.encode()).hexdigest()
    path = os.path.join(CACHE, key + ".json")
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    req = urllib.request.Request(API + "?" + qs, headers={"User-Agent": UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                data = json.load(r)
            break
        except Exception as e:
            if attempt == 3:
                print(f"  !! api failed: {e}", file=sys.stderr)
                return {}
            time.sleep(1.5 * (attempt + 1))
    with open(path, "w") as f:
        json.dump(data, f)
    return data

def search(query, limit=50):
    data = api({
        "action": "query", "format": "json", "formatversion": "2",
        "generator": "search", "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": "6", "gsrlimit": str(limit),
        "prop": "imageinfo|categories", "cllimit": "60",
        "iiprop": "url|size|extmetadata", "iiurlwidth": str(THUMB_W),
    })
    return data.get("query", {}).get("pages", []) or []

def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()

def tokens(query):
    return {w for w in re.findall(r"[a-z]+", query.lower())
            if w not in STOPWORDS and len(w) > 3}

def relaxed(query):
    """
    Commons ANDs every search term, so a long query often matches nothing.
    Drop trailing words one at a time — queries are written most-specific-first,
    so this sheds geography qualifiers while keeping the landmark itself.
    """
    words = query.split()
    forms = [query]
    for n in range(len(words) - 1, 1, -1):
        forms.append(" ".join(words[:n]))
    return forms


def head_token(query):
    for w in re.findall(r"[A-Za-z]+", query):
        if w.lower() not in STOPWORDS and len(w) > 3:
            return w.lower()
    return ""


def candidates(query, strict=True):
    """Filtered, ranked candidates for one query."""
    want = tokens(query)
    pages, seen_titles = [], set()
    for form in relaxed(query):
        for pg in search(form):
            if pg.get("title") not in seen_titles:
                seen_titles.add(pg.get("title"))
                pages.append(pg)
    out = []
    for i, page in enumerate(pages):
        info = (page.get("imageinfo") or [{}])[0]
        if not info.get("thumburl"):
            continue
        w, h = info.get("width", 0), info.get("height", 0)
        title = page.get("title", "")
        if w < 1400 or h < 800:              # too small to serve as a hero
            continue
        ratio = w / h if h else 0
        if not (1.15 <= ratio <= 2.6):       # portrait / extreme panorama
            continue
        if BAD_TITLE.search(title):
            continue
        em = info.get("extmetadata", {})
        lic = strip_html(em.get("LicenseShortName", {}).get("value", ""))
        if not lic or "fair use" in lic.lower() or "non-free" in lic.lower():
            continue
        cats = " ".join(c.get("title", "") for c in page.get("categories", []))
        readable = urllib.parse.unquote(title).replace("_", " ").lower()
        title_hits = sum(1 for t in want if t in readable)
        cat_hits = sum(1 for t in want if t in cats.lower())
        # Relevance gate. In strict mode the subject must be named in the file
        # title, which is what makes the derived alt text trustworthy; the loose
        # pass also accepts a category match, for seeds nothing else fits.
        if strict:
            # The subject itself must be named, and — for a query with several
            # distinctive words — one corroborating word alongside it.
            head = head_token(query)
            need = 2 if len(want) >= 3 else 1
            if head and head not in readable:
                continue
            if want and title_hits < need:
                continue
        elif want and title_hits == 0 and cat_hits == 0:
            continue
        out.append({
            "title": title,
            "url": norm(info["thumburl"]),
            "width": info.get("thumbwidth", THUMB_W),
            "height": info.get("thumbheight", 0),
            "page": info.get("descriptionurl", ""),
            "license": lic,
            "artist": strip_html(em.get("Artist", {}).get("value", "")) or "Wikimedia Commons contributor",
            # a subject named in the title beats one merely categorised
            "score": title_hits * 100 + cat_hits * 10 - i,
        })
    out.sort(key=lambda c: -c["score"])
    return out


TITLE_NOISE = re.compile(
    r"(\.[a-z]{3,4}$)|(\bpanoramio\b)|(\bDSC\d+)|(\bIMG[ _]?\d+)|"
    r"(\b[A-Z]{1,3}\d{2,}[ _]?\d*\b)|(\b\d{4}-\d{2}-\d{2}\b)|"
    r"(\(\d[\d ]*\))|(\b\d{5,}\b)", re.I)

def title_to_alt(title):
    """A plain-English description built from the Commons file name."""
    t = re.sub(r"^File:", "", title)
    t = urllib.parse.unquote(t).replace("_", " ")
    t = TITLE_NOISE.sub(" ", t)
    t = re.sub(r"[\"\u201c\u201d]", "", t)
    t = re.sub(r"\s*[~|].*$", "", t)          # trailing "~ an Indian cuisine made…"
    t = re.sub(r"\s*[-–,]\s*$", "", t)
    t = re.sub(r"\s{2,}", " ", t).strip(" -,–")
    # "Jama Masjid,Dharamshala,HimachalPradesh" -> spaced, comma-separated
    t = re.sub(r",(?=\S)", ", ", t)
    t = re.sub(r"(?<=[a-z])(?=[A-Z][a-z])", " ", t)
    parts = [p.strip() for p in t.split(",") if p.strip()]
    seen, clean = set(), []
    for p in parts:
        k = p.lower()
        if k not in seen:
            seen.add(k)
            clean.append(p)
    t = ", ".join(clean)
    if t.isupper():                           # SHOUTED FILE NAMES
        t = t.capitalize()
    return t[:1].upper() + t[1:] if t else ""


def vouched(alt_query, title):  # noqa: D401
    """
    True when the file name evidences the landmark the alt text claims, so the
    hand-written alt can be trusted. Otherwise we describe what we actually got
    rather than asserting a place the photograph may not show.
    """
    hay = urllib.parse.unquote(title).lower().replace("_", " ")
    head = head_token(alt_query)
    if head and head not in hay:
        return False
    want = tokens(alt_query)
    need = 2 if len(want) >= 3 else 1
    return sum(1 for t in want if t in hay) >= need


def fetch_titles(titles):
    """Image info for exact file titles (the hand-pinned choices)."""
    out = {}
    for i in range(0, len(titles), 20):
        batch = titles[i:i + 20]
        data = api({
            "action": "query", "format": "json", "formatversion": "2",
            "titles": "|".join(batch), "prop": "imageinfo",
            "iiprop": "url|size|extmetadata", "iiurlwidth": str(THUMB_W),
        })
        for page in data.get("query", {}).get("pages", []):
            info = (page.get("imageinfo") or [{}])[0]
            if info.get("thumburl"):
                out[page["title"]] = info
    return out


def main():
    spec = json.load(open(os.path.join(ROOT, "scripts", "image-spec.json")))
    pins = {k: v for k, v in
            json.load(open(os.path.join(SPEC_DIR, "pins.json"))).items()
            if not k.startswith("_")}
    manifest, used, unresolved = {}, set(), []

    pinned_info = fetch_titles([p["title"] for p in pins.values()])
    for seed, pin in pins.items():
        info = pinned_info.get(pin["title"])
        if not info:
            print(f"  !! pin not found: {pin['title']}", file=sys.stderr)
            continue
        em = info.get("extmetadata", {})
        url = norm(info["thumburl"])
        used.add(url)
        manifest[seed] = {
            "url": url, "alt": pin["alt"],
            "width": info.get("thumbwidth", THUMB_W),
            "height": info.get("thumbheight", 0),
            "credit": strip_html(em.get("Artist", {}).get("value", "")) or "Wikimedia Commons contributor",
            "license": strip_html(em.get("LicenseShortName", {}).get("value", "")),
            "source": info.get("descriptionurl", ""),
            "query": "pinned", "level": 0, "strict": True,
            "reused": False, "altSource": "pinned",
        }

    # Warm the cache in parallel; resolution itself stays single-threaded so the
    # dedupe decisions are deterministic across runs.
    all_queries = []
    for s in spec.values():
        all_queries.extend(s["queries"])
    all_queries = [f for q in all_queries for f in relaxed(q)]
    uniq = list(dict.fromkeys(all_queries))
    print(f"warming {len(uniq)} queries…")
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(lambda q: search(q), uniq))

    for seed in sorted(spec):
        if seed in manifest:       # hand-pinned above
            continue
        entry = spec[seed]
        picked = None
        for strict in (True, False):
            for allow_reuse in (False, True):
                for qi, q in enumerate(entry["queries"]):
                    for c in candidates(q, strict=strict):
                        if c["url"] in used and not allow_reuse:
                            continue
                        picked = dict(c, query=q, level=qi + 1, strict=strict,
                                      reused=c["url"] in used)
                        break
                    if picked:
                        break
                if picked:
                    break
            if picked:
                break
        if not picked:
            unresolved.append(seed)
            continue
        used.add(picked["url"])
        derived = title_to_alt(picked["title"])
        trusted = (picked["level"] == 1 and picked["strict"]
                   and vouched(entry["queries"][0], picked["title"]))
        manifest[seed] = {
            "url": picked["url"],
            "alt": entry["alt"] if trusted else (derived or entry["alt"]),
            "altSource": "authored" if trusted else "derived",
            "width": picked["width"],
            "height": picked["height"],
            "credit": picked["artist"],
            "license": picked["license"],
            "source": picked["page"],
            "query": picked["query"],
            "level": picked["level"],
            "strict": picked["strict"],
            "reused": picked["reused"],
        }

    # Carry over the download bookkeeping written by localise-images.mjs, so a
    # re-run only re-fetches the seeds whose photograph actually changed.
    out = os.path.join(ROOT, "scripts", "image-manifest.json")
    if os.path.exists(out):
        previous = json.load(open(out))
        for seed, entry in manifest.items():
            old = previous.get(seed)
            if old and old.get("localFrom") == entry["url"]:
                for key in ("localFrom", "localWidth", "localHeight"):
                    if key in old:
                        entry[key] = old[key]
    json.dump(manifest, open(out, "w"), indent=2, ensure_ascii=False)
    lv = {}
    for m in manifest.values():
        lv[m["level"]] = lv.get(m["level"], 0) + 1
    print(f"resolved {len(manifest)}/{len(spec)}  by fallback level: {dict(sorted(lv.items()))}")
    if unresolved:
        print(f"UNRESOLVED ({len(unresolved)}): {unresolved}")

main()
