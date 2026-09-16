/**
 * Downloads every photograph in the manifest and writes an optimised local
 * copy to public/img/<seed>.jpg.
 *
 * Hotlinking Wikimedia at page-view volume gets rate-limited (HTTP 429) and is
 * discouraged by their policy, and some files are multi-megabyte originals.
 * Serving our own copies fixes both, and the CC licences permit redistribution
 * as long as the credit travels with the image — which it does, via the
 * manifest and /image-credits.
 *
 * Re-running skips files already present, so it is safe to repeat.
 */
import { readFile, writeFile, mkdir, stat, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "img");
const MANIFEST = path.join(ROOT, "scripts", "image-manifest.json");

const MAX_WIDTH = 1600;   // enough for a full-bleed hero; Next resizes downward
const QUALITY = 72;
const UA = "TheTravelKart/1.0 (https://thetravelkart.in; thetravelkart@gmail.com)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchBuffer(url, attempt = 0) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 5) throw new Error(`${res.status} after retries`);
    await sleep(2000 * (attempt + 1));
    return fetchBuffer(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
await mkdir(OUT, { recursive: true });

const seeds = Object.keys(manifest).sort();
let done = 0, skipped = 0, failed = [];

// Small concurrency and a pause between requests: this is someone else's
// bandwidth and their rate limiter is not theoretical.
const QUEUE = [...seeds];
async function worker() {
  while (QUEUE.length) {
    const seed = QUEUE.shift();
    const entry = manifest[seed];
    const file = path.join(OUT, `${seed}.webp`);
    try {
      await stat(file);
      if (entry.localFrom === entry.url) {
        const meta = await sharp(file).metadata();
        entry.localWidth = meta.width;
        entry.localHeight = meta.height;
        skipped++;
        continue;
      }
      // the seed now resolves to a different photograph — replace the file
    } catch {
      /* not downloaded yet */
    }
    try {
      const buf = await fetchBuffer(entry.url);
      const out = await sharp(buf)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toBuffer({ resolveWithObject: true });
      await writeFile(file, out.data);
      entry.localWidth = out.info.width;
      entry.localHeight = out.info.height;
      entry.localFrom = entry.url;
      done++;
      if (done % 25 === 0) process.stdout.write(`  downloaded ${done}…\n`);
      await sleep(Number(process.env.IMAGE_DELAY_MS ?? 150));
    } catch (err) {
      failed.push([seed, String(err.message)]);
    }
  }
}
const WORKERS = Number(process.env.IMAGE_WORKERS ?? 4);
await Promise.all(Array.from({ length: WORKERS }, worker));

// Drop files for seeds that no longer exist.
for (const f of await readdir(OUT)) {
  if (f.endsWith(".webp") && !manifest[f.replace(/\.webp$/, "")]) {
    await unlink(path.join(OUT, f));
    console.log("  removed stale", f);
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

let bytes = 0;
for (const f of await readdir(OUT)) bytes += (await stat(path.join(OUT, f))).size;
console.log(`downloaded ${done}, reused ${skipped}, failed ${failed.length}`);
console.log(`public/img total ${(bytes / 1024 / 1024).toFixed(1)} MB across ${seeds.length} images`);
for (const [s, e] of failed.slice(0, 10)) console.log(`  FAIL ${s}: ${e}`);
