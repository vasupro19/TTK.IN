import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "sunset" | "neutral";
  className?: string;
}) {
  const toneClasses = {
    brand: "bg-brand-50 text-brand-700",
    sunset: "bg-sunset-50 text-sunset-600",
    neutral: "bg-sand-200 text-ink-700",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses,
        className
      )}
    >
      {children}
    </span>
  );
}
