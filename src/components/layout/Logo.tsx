import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Intrinsic size of the supplied artwork. */
const LOCKUP = { width: 712, height: 304 } as const;
const ASPECT = LOCKUP.width / LOCKUP.height;

/**
 * The company logo.
 *
 * `/logo.png` is the supplied artwork with its cream ground keyed out to
 * transparency; `/logo-light.png` is the same file with the black ink mapped to
 * white so the wordmark stays readable on dark surfaces (the orange is kept in
 * both). `tone` picks between them.
 */
export function Logo({
  tone = "dark",
  height = 44,
  href = "/",
  priority = false,
  className,
}: {
  /** "dark" = dark ink for light backgrounds; "light" = white ink for dark backgrounds. */
  tone?: "dark" | "light";
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  href?: string | null;
  priority?: boolean;
  className?: string;
}) {
  const width = Math.round(height * ASPECT);

  const image = (
    <Image
      src={tone === "light" ? "/logo-light.png" : "/logo.png"}
      alt="TheTravelKart — the world, your way"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className="h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      style={{ height, width }}
    />
  );

  const classes = cn("group inline-flex items-center", className);

  if (href === null) {
    return <span className={classes}>{image}</span>;
  }

  return (
    <Link href={href} aria-label="TheTravelKart — home" className={classes}>
      {image}
    </Link>
  );
}

/**
 * Square mark — the aeroplane and swoosh, cropped from the lockup. Used where a
 * wide logo will not fit: avatars, app icons, tight mobile bars.
 */
export function LogoMark({
  tone = "dark",
  size = 40,
  className,
}: {
  tone?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={tone === "light" ? "/logo-mark-light.png" : "/logo-mark.png"}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
