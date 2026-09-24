"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X, Menu, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { navLinks } from "./nav-links";
import { Logo } from "./Logo";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-ink-900"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Portalled to <body>: the header bar uses `backdrop-blur`, and a
          backdrop-filter makes an element the containing block for its
          `position: fixed` descendants — rendered in place, the drawer was
          clipped to the header's 80px height instead of filling the screen. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm"
            />

            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-ink-900"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
                {navLinks.map((link) => (
                  <div key={link.href} className="border-b border-sand-200 py-1.5 last:border-0">
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-center justify-between py-3 text-base font-semibold text-ink-900"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-ink-600/40" aria-hidden="true" />
                    </Link>
                    {link.children && (
                      <div className="-mt-1 mb-2 flex flex-wrap gap-2">
                        {/* Every child but the one repeating the parent link, so
                            adding a destination never pushes another off. */}
                        {link.children
                          .filter((child) => child.href !== link.href)
                          .map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={close}
                              className="rounded-full bg-sand-100 px-3 py-1.5 text-xs font-medium text-ink-700"
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="space-y-3 border-t border-sand-200 bg-sand-50 p-5">
                <Link
                  href="/plan-my-trip"
                  onClick={close}
                  className="block rounded-full bg-sunset-500 px-6 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Plan My Trip
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={telLink()}
                    className="flex items-center justify-center gap-2 rounded-full border border-sand-200 bg-white py-3 text-sm font-semibold text-ink-800"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call us
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
                <p className="text-center text-xs text-ink-600/60">
                  {siteConfig.phoneDisplay} · {siteConfig.altPhoneDisplay}
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
