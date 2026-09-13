import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BlogPostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {post.tags[0]} · {post.readMinutes} min read
        </p>
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-ink-900 group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-600/75">{post.excerpt}</p>
        <p className="mt-auto pt-3 text-xs text-ink-600/50">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
