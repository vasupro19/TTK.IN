"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lightweight scroll-reveal: toggles a class via IntersectionObserver instead
 * of an animation library, keeping this at ~0kb of shipped JS logic.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={{ animationDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </div>
  );
}
