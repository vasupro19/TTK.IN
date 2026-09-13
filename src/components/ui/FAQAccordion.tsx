"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-ink-900 sm:text-base">
                {faq.question}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-200",
                  isOpen && "rotate-45"
                )}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 4a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 4z" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-600/80">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
