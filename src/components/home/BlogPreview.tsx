import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";
import { BlogPostCard } from "@/components/cards/BlogPostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="bg-sand-50 py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Travel Journal"
            title="Guides to plan your next trip"
            description="Practical, no-fluff guides written by our travel consultants."
          />
          <Link href="/blog" className="whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800">
            Read all articles →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70}>
              <BlogPostCard post={post} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
