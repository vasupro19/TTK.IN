"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Globe, Camera, Users, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { TrustMarks } from "./TrustMarks";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig, telLink, whatsappLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Routes that get the stripped-back footer.
 *
 * These are paid-traffic landing pages: the job of the page is one enquiry, so
 * the footer carries contact details and accreditation rather than the site's
 * full link map, which only offers ways to leave. Every other page keeps the
 * complete footer — the destination, service, company and policy links still
 * exist and are still crawlable from everywhere else on the site.
 */
const LANDING_ROUTES = new Set([
  "/himachal-pradesh-tour-packages",
  "/rajasthan-tour-packages",
  "/spiti-valley-tour-packages",
]);

const destinationLinks = [
  { label: "Himachal", href: "/himachal-pradesh-tour-packages" },
  { label: "Kashmir", href: "/kashmir-tour-packages" },
  { label: "Ladakh", href: "/ladakh-tour-packages" },
  { label: "Spiti", href: "/spiti-valley-tour-packages" },
  { label: "Uttarakhand", href: "/uttarakhand-tour-packages" },
  { label: "Rajasthan", href: "/rajasthan-tour-packages" },
  { label: "Kerala", href: "/kerala-tour-packages" },
  { label: "Goa", href: "/goa-tour-packages" },
  { label: "North East", href: "/north-east-tour-packages" },
];

const serviceLinks = [
  { label: "Holiday Packages", href: "/packages" },
  { label: "Hotels", href: "/hotels" },
  { label: "Cabs", href: "/cabs" },
  { label: "Custom Trips", href: "/plan-my-trip" },
  { label: "Honeymoon Packages", href: "/packages?category=honeymoon" },
  { label: "Corporate Travel", href: "/packages?category=corporate" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  // Most site photography is CC-licensed; the credits page is a licence
  // obligation, so it has to be reachable from every page.
  { label: "Photo Credits", href: "/image-credits" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const contactRow =
  "flex items-center gap-2.5 text-white/75 transition-colors hover:text-white";
const socialPill =
  "flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/20 hover:text-white";

/** Logo, what we do, how to reach us — identical in both footers. */
function BrandBlock({
  className,
  /** Landing pages name the WhatsApp line as such; it is the CTA they run on. */
  labelWhatsApp = false,
}: {
  className?: string;
  labelWhatsApp?: boolean;
}) {
  return (
    <div className={cn("max-w-sm", className)}>
      <Logo tone="light" />
      <p className="mt-5 text-sm leading-relaxed text-white/60">
        TheTravelKart is a travel company run by people who have driven these roads
        themselves. We plan custom holidays across the Himalayas, the coasts and beyond —
        verified stays, honest pricing, and a real person on WhatsApp the whole way.
      </p>

      <div className="mt-6 space-y-2.5 text-sm">
        <a href={telLink()} className={contactRow}>
          <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
          {siteConfig.phoneDisplay}
        </a>
        {labelWhatsApp ? (
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={contactRow}
          >
            <MessageCircle className="h-4 w-4 text-brand-300" aria-hidden="true" />
            WhatsApp {siteConfig.whatsappDisplay}
          </a>
        ) : (
          <a href={telLink(siteConfig.altPhoneRaw)} className={contactRow}>
            <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
            {siteConfig.altPhoneDisplay}
          </a>
        )}
        <a href={`mailto:${siteConfig.email}`} className={contactRow}>
          <Mail className="h-4 w-4 text-brand-300" aria-hidden="true" />
          {siteConfig.email}
        </a>
        <p className="flex items-center gap-2.5 text-white/75">
          <Globe className="h-4 w-4 text-brand-300" aria-hidden="true" />
          {siteConfig.domain}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <a
          href={siteConfig.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={socialPill}
        >
          <Camera className="h-4 w-4" aria-hidden="true" />
          Instagram
          <span className="sr-only"> — {siteConfig.socialHandles.instagram}</span>
        </a>
        <a
          href={siteConfig.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={socialPill}
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          Facebook
        </a>
      </div>
    </div>
  );
}

function NewsletterBlock() {
  return (
    <div>
      <h3 className="text-sm font-bold text-white">Trip ideas, once a month</h3>
      <p className="mt-2 text-xs text-white/55">
        Seasonal routes and honest advice. No spam.
      </p>
      <div className="mt-3">
        <NewsletterForm />
      </div>
    </div>
  );
}

/** The full site footer: brand block plus the four link columns. */
function SiteFooterBody() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
      <BrandBlock />

      <FooterColumn title="Destinations" links={destinationLinks} />
      <FooterColumn title="Services" links={serviceLinks} />
      <FooterColumn title="Company" links={companyLinks} />

      <div>
        <FooterColumn title="Policies" links={policyLinks} />
        <div className="mt-8">
          <NewsletterBlock />
        </div>
      </div>
    </div>
  );
}

/**
 * Landing-page footer: who we are, how to reach us, what we are registered
 * with. Two columns instead of five so the space the link columns used to fill
 * closes up rather than sitting empty.
 */
function LandingFooterBody() {
  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <BrandBlock className="max-w-xl" labelWhatsApp />
        <div className="lg:justify-self-end lg:max-w-xs">
          <NewsletterBlock />
        </div>
      </div>

      <TrustMarks className="mt-12 border-t border-white/10 pt-8" />
    </>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isLanding = LANDING_ROUTES.has(pathname);

  return (
    <footer
      className={cn(
        "bg-ink-900 text-white",
        // `cn` is a plain join, not tailwind-merge, so the margin is chosen
        // here rather than layered: the landing page ends on a dark CTA, and
        // the usual gap above the footer reads as a seam between two dark
        // bands. Its fixed bottom bar would also cover the copyright line.
        isLanding
          ? "pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0"
          : "mt-24"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {isLanding ? <LandingFooterBody /> : <SiteFooterBody />}

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Made in Himachal, for travellers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
