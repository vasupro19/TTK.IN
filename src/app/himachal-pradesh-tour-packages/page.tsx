import type { Metadata } from "next";
import Link from "next/link";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { HimachalHero } from "@/components/himachal/HimachalHero";
import { TrustStrip } from "@/components/himachal/TrustStrip";
import { HimachalPackages } from "@/components/himachal/HimachalPackages";
import { WhyBook } from "@/components/himachal/WhyBook";
import { Testimonials } from "@/components/himachal/Testimonials";
import { EnquirySection } from "@/components/himachal/EnquirySection";
import { MobileBottomCTA } from "@/components/himachal/MobileBottomCTA";
import { EnquiryProvider } from "@/components/lead/EnquiryModal";
import { Container } from "@/components/ui/Container";
import { searchPackages } from "@/lib/api/packages";
import { absoluteUrl, breadcrumbJsonLd, siteConfig } from "@/lib/seo";
import { photo, image, imageAlt } from "@/lib/images";

const TITLE = "Himachal Pradesh Tour Packages";
/** Used where the brand is not appended by the layout's title template. */
const TITLE_WITH_BRAND = `${TITLE} | ${siteConfig.name}`;
const DESCRIPTION =
  "Explore Himachal Pradesh with TheTravelKart. Discover customized tour packages for Shimla, Manali, Dharamshala, Dalhousie, Spiti and more with hotels, private cabs and personalized itineraries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/himachal-pradesh-tour-packages" },
  keywords: [
    "Himachal Pradesh tour packages",
    "Himachal tour packages",
    "Himachal Pradesh holiday packages",
    "Himachal trip packages",
    "Shimla Manali tour packages",
    "Himachal honeymoon packages",
    "Himachal family tour packages",
    "Himachal Pradesh packages from Delhi",
    "Himachal Pradesh packages from Chandigarh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/himachal-pradesh-tour-packages"),
    siteName: siteConfig.name,
    title: TITLE_WITH_BRAND,
    description: DESCRIPTION,
    images: [
      {
        url: photo("hp-hero-himalaya"),
        width: image("hp-hero-himalaya").width,
        height: image("hp-hero-himalaya").height,
        alt: imageAlt("hp-hero-himalaya"),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_WITH_BRAND,
    description: DESCRIPTION,
    images: [photo("hp-hero-himalaya")],
  },
};

export default function HimachalLandingPage() {
  const packages = searchPackages({ regionSlug: "himachal", sort: "price-asc" });

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
      { name: "Himachal Pradesh Tour Packages", path: "/himachal-pradesh-tour-packages" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: "Himachal Pradesh",
      description: DESCRIPTION,
      url: absoluteUrl("/himachal-pradesh-tour-packages"),
      touristType: ["Families", "Couples", "Adventure travellers", "Groups"],
      includesAttraction: [
        "Shimla", "Manali", "Dharamshala", "Dalhousie", "Kasol",
        "Spiti Valley", "Kinnaur", "Tirthan Valley", "Kasauli", "Bir Billing",
      ].map((name) => ({ "@type": "TouristAttraction", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Himachal Pradesh Tour Packages",
      url: absoluteUrl("/himachal-pradesh-tour-packages"),
      provider: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
      itemListElement: packages.map((pkg, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: pkg.title,
        url: absoluteUrl(`/packages/${pkg.slug}`),
        priceCurrency: "INR",
        price: pkg.price,
        availability: "https://schema.org/InStock",
      })),
    },
  ];

  return (
    // Every CTA on this page opens one shared enquiry dialog, and the provider
    // also opens it once, a few seconds in, for visitors who would otherwise
    // read and leave.
    <EnquiryProvider destination="Himachal Pradesh">
      <MetaPixel />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HimachalHero />
      <TrustStrip />

      {/* Breadcrumb trail, kept below the fold so the hero CTA stays first. */}
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-600/60">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/destinations" className="hover:text-brand-700">Destinations</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Himachal Pradesh Tour Packages</span>
        </nav>
      </Container>

      {/* Deliberately short. This is an ad landing page: packages, proof,
          then the enquiry. The seasons, food, FAQ and long-form SEO blocks
          were removed so nothing sits between a visitor and the quote. */}
      <HimachalPackages />
      <WhyBook />
      <Testimonials />
      <EnquirySection />

      {/* The room the fixed bar needs is added to the footer itself, in
          globals.css under `body[data-bottom-bar]` — a spacer here would sit
          above the footer and leave the footer's last row covered. */}
      <MobileBottomCTA />
    </EnquiryProvider>
  );
}
