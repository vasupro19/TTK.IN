import Link from "next/link";
import { Phone, Mail, Globe, Camera, Users } from "lucide-react";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig, telLink } from "@/lib/seo";

const destinationLinks = [
  { label: "Himachal", href: "/himachal-pradesh-tour-packages" },
  { label: "Kashmir", href: "/kashmir-tour-packages" },
  { label: "Ladakh", href: "/ladakh-tour-packages" },
  { label: "Spiti", href: "/destinations/spiti-valley" },
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

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              TheTravelKart is a travel company run by people who have driven these roads
              themselves. We plan custom holidays across the Himalayas, the coasts and beyond —
              verified stays, honest pricing, and a real person on WhatsApp the whole way.
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={telLink()}
                className="flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={telLink(siteConfig.altPhoneRaw)}
                className="flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                {siteConfig.altPhoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-white/75 transition-colors hover:text-white"
              >
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
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Instagram
                <span className="sr-only"> — {siteConfig.socialHandles.instagram}</span>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                Facebook
              </a>
            </div>
          </div>

          <FooterColumn title="Destinations" links={destinationLinks} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Company" links={companyLinks} />

          <div>
            <FooterColumn title="Policies" links={policyLinks} />
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white">Trip ideas, once a month</h3>
              <p className="mt-2 text-xs text-white/55">
                Seasonal routes and honest advice. No spam.
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

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
