import type { Metadata } from "next";
import Link from "next/link";
import { activities } from "@/lib/data/activities";
import { destinations } from "@/lib/data/destinations";
import { getDestinationBySlug } from "@/lib/data/destinations";
import { ActivityCard } from "@/components/cards/ActivityCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Activities & Experiences",
  description:
    "Book adventure sports, cultural experiences, and leisure activities across TheTravelKart's destinations — rafting, scuba diving, cruises and more.",
  alternates: { canonical: "/activities" },
};

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { destination } = await searchParams;
  const activeDestination = typeof destination === "string" ? destination : "";

  const filtered = activeDestination
    ? activities.filter((a) => a.destinationSlug === activeDestination)
    : activities;

  const destinationsWithActivities = destinations.filter((d) =>
    activities.some((a) => a.destinationSlug === d.slug)
  );

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Activities & Experiences
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          Add adventure sports, cultural experiences, or a slow afternoon cruise to any package —
          or book them standalone.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/activities"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              !activeDestination ? "bg-brand-700 text-white" : "bg-sand-100 text-ink-700 hover:bg-sand-200"
            )}
          >
            All destinations
          </Link>
          {destinationsWithActivities.map((d) => (
            <Link
              key={d.slug}
              href={`/activities?destination=${d.slug}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeDestination === d.slug
                  ? "bg-brand-700 text-white"
                  : "bg-sand-100 text-ink-700 hover:bg-sand-200"
              )}
            >
              {d.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((activity, i) => {
            const destinationData = getDestinationBySlug(activity.destinationSlug);
            return (
              <div key={activity.slug}>
                <ActivityCard activity={activity} priority={i < 2} />
                {destinationData && (
                  <p className="mt-2 text-xs text-ink-600/60">
                    📍 {destinationData.name}, {destinationData.country}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
