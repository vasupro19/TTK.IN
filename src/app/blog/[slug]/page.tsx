import type { Metadata } from "next";
import { SmartImage } from "@/components/ui/SmartImage";
import { photo } from "@/lib/images";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog";
import { BlogPostCard } from "@/components/cards/BlogPostCard";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: photo(post.coverImageSeed) }],
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    articleJsonLd(post),
  ];

  return (
    <article className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl">
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-700">Blog</Link>
        </nav>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-sm text-ink-600/60">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <SmartImage
            seed={post.coverImageSeed}
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-700">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink-900">Related reads</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogPostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
