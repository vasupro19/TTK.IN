import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/seo";
import { allImageCredits } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: `Photographers and licences for the photography used across ${siteConfig.name}.`,
  alternates: { canonical: "/image-credits" },
  robots: { index: false, follow: true },
};

/**
 * Attribution page. Most of the photography on this site is used under Creative
 * Commons licences that require the photographer to be credited, so this list
 * is a licence obligation rather than a nicety — it is generated from the same
 * manifest that supplies the images, and cannot fall out of step with them.
 */
export default function ImageCreditsPage() {
  const credits = allImageCredits();

  // One entry per photograph, not per place it appears.
  const bySource = new Map<string, (typeof credits)[number]>();
  for (const c of credits) {
    if (!bySource.has(c.source)) bySource.set(c.source, c);
  }
  const unique = [...bySource.values()].sort((a, b) => a.alt.localeCompare(b.alt));

  return (
    <Container className="max-w-3xl py-14">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">Photo credits</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        The destination, package and stay photography on this site comes from Wikimedia Commons and
        is used under the licences listed below. Photographs are chosen to show the place actually
        being described. Where a listing is sample data rather than a live booking, its photograph
        shows the location, not the specific property.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        {unique.length} photographs are in use. If you are the photographer of any image here and
        would like it credited differently or removed, write to{" "}
        <a className="font-semibold text-brand-700 underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>

      <ul className="mt-9 space-y-4">
        {unique.map((c) => (
          <li key={c.source} className="border-b border-sand-200 pb-4 text-sm">
            <p className="font-medium text-ink-900">{c.alt}</p>
            <p className="mt-1 text-ink-600/75">
              <span>{c.credit}</span>
              <span aria-hidden="true"> · </span>
              <span>{c.license}</span>
              <span aria-hidden="true"> · </span>
              <a
                href={c.source}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="text-brand-700 underline"
              >
                source
              </a>
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
