import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
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
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
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
