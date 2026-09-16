import NextImage from "next/image";
import { image, photo } from "@/lib/images";

/**
 * The only way photographs reach the page.
 *
 * Callers pass a seed — the name of the thing being shown — and get back a
 * photograph of that thing together with alt text describing it. Keeping both
 * on the same lookup is what stops a card from pairing a Ladakh photograph with
 * the words "Spiti Valley": there is no call site where the two can drift apart.
 */
export function SmartImage({
  seed,
  alt,
  sizes,
  className,
  priority = false,
  preload = false,
  quality,
  fill = true,
  loading,
  width,
  height,
}: {
  seed: string;
  /** Overrides the manifest description; use only when context needs it. */
  alt?: string;
  sizes?: string;
  className?: string;
  /**
   * Above the fold: load eagerly at high fetch priority. Next 16 deprecated
   * `priority`, and its docs point at `loading`/`fetchPriority` for this case —
   * `preload` is reserved for a single, unambiguous LCP image.
   */
  priority?: boolean;
  /** The one hero image that is definitely the LCP element on its page. */
  preload?: boolean;
  quality?: number;
  fill?: boolean;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
}) {
  const resolved = image(seed);
  const eager = priority || preload;

  const shared = {
    src: photo(seed),
    alt: alt ?? resolved.alt,
    sizes,
    quality,
    className,
    preload: preload || undefined,
    loading: loading ?? (eager ? ("eager" as const) : undefined),
    fetchPriority: eager ? ("high" as const) : undefined,
  };

  if (!fill) {
    return (
      <NextImage
        {...shared}
        width={width ?? resolved.width}
        height={height ?? resolved.height}
      />
    );
  }

  return <NextImage {...shared} fill />;
}
