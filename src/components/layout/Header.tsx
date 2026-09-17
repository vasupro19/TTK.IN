"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Phone, MessageCircle, UserRound } from "lucide-react";
import { navLinks } from "./nav-links";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { siteConfig, whatsappLink, telLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar — collapses away once the page starts moving. */}
      <div
        className={cn(
          "hidden overflow-hidden border-b border-white/10 bg-ink-900 text-white transition-all duration-300 lg:block",
          scrolled ? "h-0 border-b-0 opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <p className="text-white/70">
            Real travel experts on call — not a call centre. Planning since {siteConfig.foundingYear}.
          </p>
          <div className="flex items-center gap-5">
            <a href={telLink()} className="font-medium text-white/85 hover:text-white">
              {siteConfig.phoneDisplay}
            </a>
            <a href={telLink(siteConfig.altPhoneRaw)} className="font-medium text-white/85 hover:text-white">
              {siteConfig.altPhoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="text-white/70 hover:text-white">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-white/90 backdrop-blur-md transition-all duration-300",
          scrolled ? "border-black/5 shadow-sm" : "border-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-300 sm:px-6 lg:px-8",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
                  >
                    {link.label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white p-2 shadow-xl shadow-ink-900/10">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sand-50"
                        >
                          <span className="block text-sm font-semibold text-ink-900">
                            {child.label}
                          </span>
                          {child.hint && (
                            <span className="mt-0.5 block text-xs text-ink-600/65">{child.hint}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={telLink()}
              aria-label={`Call ${siteConfig.phoneDisplay}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-[#1da851] transition-colors hover:border-[#25D366] hover:bg-[#25D366]/5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/my-trips"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              My Trips
            </Link>
            <Link
              href="/plan-my-trip"
              className="inline-flex min-h-11 items-center rounded-full bg-sunset-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sunset-600 active:scale-[0.98]"
            >
              Plan My Trip
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat
            </a>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
