import Link from "next/link";
import { Quote, Star } from "lucide-react";
import { listPublishedReviews, catalogueStats } from "@/lib/api/catalogue";
import { getPackage } from "@/lib/api/packages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** "Priya & Arjun Malhotra" -> "PM"; used in place of an invented portrait. */
function initials(name: string): string {
  const words = name.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function CustomerStories() {
  const reviews = listPublishedReviews(6);
  const stats = catalogueStats();

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Customer stories"
          title="Trips People Remember"
          description="Reviews come from travellers who actually booked — we publish the ordinary ones alongside the glowing ones."
        />

        {/* Stat band — figures are derived from the catalogue, not hard-coded claims. */}
        <div className="mx-auto mt-9 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-sand-200 ring-1 ring-sand-200 sm:grid-cols-3">
          <div className="bg-white px-6 py-5 text-center">
            <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-extrabold text-ink-900">
              <Star className="h-5 w-5 fill-sunset-400 text-sunset-400" aria-hidden="true" />
              {stats.averageRating}/5
            </p>
            <p className="mt-1 text-xs text-ink-600/65">
              Average across {stats.reviewCount.toLocaleString("en-IN")} trip ratings
            </p>
          </div>
          <div className="bg-white px-6 py-5 text-center">
            <p className="font-display text-2xl font-extrabold text-ink-900">
              {stats.packageCount} itineraries
            </p>
            <p className="mt-1 text-xs text-ink-600/65">
              Across {stats.regionCount} regions and {stats.destinationCount} destinations
            </p>
          </div>
          <div className="bg-white px-6 py-5 text-center">
            <p className="font-display text-2xl font-extrabold text-ink-900">24/7</p>
            <p className="mt-1 text-xs text-ink-600/65">
              Coordinator on WhatsApp for the length of your trip
            </p>
          </div>
        </div>

        <div className="mt-9 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {reviews.map((review, i) => {
            const pkg = getPackage(review.packageSlug);
            return (
              <div key={review.id} className="w-[85vw] shrink-0 snap-start sm:w-auto">
                <Reveal delay={i * 50}>
                  <figure className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-6">
                    <Quote className="h-6 w-6 text-brand-200" aria-hidden="true" />
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                      {review.body}
                    </blockquote>

                    <div className="mt-5 flex items-center gap-1" aria-label={`Rated ${review.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={
                            starIndex < review.rating
                              ? "h-3.5 w-3.5 fill-sunset-400 text-sunset-400"
                              : "h-3.5 w-3.5 text-sand-200"
                          }
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <figcaption className="mt-4 flex items-center gap-3 border-t border-sand-200 pt-4">
                      {/*
                        Initials rather than a photograph: these are sample
                        reviews, and inventing a face for a named traveller
                        would misrepresent a real person. When the CRM supplies
                        verified reviews, a real avatar can replace this.
                      */}
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-brand-100"
                      >
                        {initials(review.customerName)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink-900">
                          {review.customerName}
                        </span>
                        <span className="block truncate text-xs text-ink-600/65">
                          {review.location}
                          {review.travelledOn ? ` · ${review.travelledOn}` : ""}
                        </span>
                      </span>
                    </figcaption>

                    {pkg && (
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="mt-3 text-xs font-semibold text-brand-700 hover:underline"
                      >
                        {pkg.title} →
                      </Link>
                    )}
                  </figure>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
