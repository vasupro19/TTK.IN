import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "brand",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /**
   * Eyebrow colouring. "desert" is the Rajasthan page's terracotta, "slate"
   * the Spiti page's stone grey.
   */
  tone?: "brand" | "desert" | "slate";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
            tone === "desert"
              ? "bg-sandstone-100 text-terracotta-700"
              : tone === "slate"
                ? "bg-slate-100 text-slate-700"
                : "bg-brand-50 text-brand-700"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-balance text-base text-ink-600/80 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
