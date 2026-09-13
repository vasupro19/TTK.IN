import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/blog";
import { BlogPostCard } from "@/components/cards/BlogPostCard";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Travel Journal — Guides & Itinerary Tips",
  description:
    "Practical travel guides from TheTravelKart's consultants — destination comparisons, budget breakdowns, and first-timer tips.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          The Travel Journal
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600/75">
          No-fluff guides written by the people who actually plan these trips.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <BlogPostCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      </Container>
    </div>
  );
}
