import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryProvider } from "@/components/lead/EnquiryModal";
import { MobileBottomCTA } from "@/components/landing/MobileBottomCTA";
import { Container } from "@/components/ui/Container";
import { SpitiHero } from "@/components/spiti/SpitiHero";
import { SpitiPackages, spitiPackageCards } from "@/components/spiti/SpitiPackages";
import { SpitiCustomTrip } from "@/components/spiti/SpitiCustomTrip";
import { SpitiRoutes } from "@/components/spiti/SpitiRoutes";
import { SpitiPlaces } from "@/components/spiti/SpitiPlaces";
import { SpitiWhyBook } from "@/components/spiti/SpitiWhyBook";
import { SpitiStories } from "@/components/spiti/SpitiStories";
import { SpitiGuide } from "@/components/spiti/SpitiGuide";
import { SpitiEnquiry } from "@/components/spiti/SpitiEnquiry";
import { SPITI_WA_MESSAGE, spitiFaqs, spitiFormOptions } from "@/lib/data/spiti";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, siteConfig } from "@/lib/seo";
import { photo, image, imageAlt } from "@/lib/images";

const PATH = "/spiti-valley-tour-packages";
/** Full title, brand included — `absolute` so the layout template does not append it again. */
const TITLE = "Spiti Valley Tour Packages | Kaza, Chandratal & Spiti Road Trips | TheTravelKart";
const DESCRIPTION =
  "Explore Spiti Valley tour packages with TheTravelKart. Plan Shimla-Spiti, Manali-Spiti and Spiti circuit trips with private SUVs, stays and customized itineraries.";
const HERO = "sp-hero";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    "Spiti Valley tour packages",
    "Spiti Valley trip",
    "Spiti Valley road trip",
    "Shimla to Spiti tour",
    "Manali to Spiti tour",
    "Chandratal tour packages",
    "Kaza tour packages",
    "Spiti Valley packages from Delhi",
    "Spiti Valley packages from Chandigarh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl(PATH),
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: photo(HERO),
        width: image(HERO).width,
        height: image(HERO).height,
        alt: imageAlt(HERO),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [photo(HERO)],
  },
};

export default function SpitiLandingPage() {
  const cards = spitiPackageCards();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
      { name: "Spiti Valley Tour Packages", path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: "Spiti Valley",
      description: DESCRIPTION,
      url: absoluteUrl(PATH),
      containedInPlace: { "@type": "AdministrativeArea", name: "Himachal Pradesh, India" },
      touristType: ["Road trippers", "Couples", "Families", "Groups"],
      includesAttraction: [
        "Key Monastery", "Kaza", "Tabo Monastery", "Dhankar Monastery", "Chandratal",
        "Kunzum Pass", "Pin Valley", "Hikkim", "Komic", "Chicham Bridge", "Langza",
      ].map((name) => ({ "@type": "TouristAttraction", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Spiti Valley Tour Packages",
      url: absoluteUrl(PATH),
      itemListElement: cards.map((card, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristTrip",
          name: card.title,
          description: card.summary,
          url: absoluteUrl(`/packages/${card.slug}`),
          image: absoluteUrl(card.imageSrc),
          itinerary: {
            "@type": "ItemList",
            itemListElement: card.route.map((place, j) => ({
              "@type": "ListItem",
              position: j + 1,
              item: { "@type": "Place", name: place },
            })),
          },
          provider: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: card.price,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/packages/${card.slug}`),
          },
        },
      })),
    },
    // The same questions are visible on the page, in the FAQ accordion.
    faqJsonLd(spitiFaqs),
  ];

  return (
    <EnquiryProvider
      destination="Spiti Valley"
      formOptions={spitiFormOptions}
      intro="Your dates, starting point and route — a travel expert will call you back."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SpitiHero />

      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-600/60">
          <Link href="/" className="hover:text-ink-900">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/destinations" className="hover:text-ink-900">Destinations</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Spiti Valley Tour Packages</span>
        </nav>
      </Container>

      {/* Inspiration → package → route → trust → practical → enquiry. */}
      <SpitiPackages cards={cards} />
      <SpitiCustomTrip />
      <SpitiRoutes />
      <SpitiPlaces />
      <SpitiWhyBook />
      <SpitiStories />
      <SpitiGuide />
      <SpitiEnquiry />

      <MobileBottomCTA whatsappMessage={SPITI_WA_MESSAGE} hideFloatingActions />
    </EnquiryProvider>
  );
}
