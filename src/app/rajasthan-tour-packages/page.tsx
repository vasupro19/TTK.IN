import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryProvider } from "@/components/lead/EnquiryModal";
import { MobileBottomCTA } from "@/components/landing/MobileBottomCTA";
import { Container } from "@/components/ui/Container";
import { RajasthanHero } from "@/components/rajasthan/RajasthanHero";
import { RajasthanPackages, rajasthanPackageCards } from "@/components/rajasthan/RajasthanPackages";
import { RajasthanWhyBook } from "@/components/rajasthan/RajasthanWhyBook";
import { RajasthanStories } from "@/components/rajasthan/RajasthanStories";
import { RajasthanGuide } from "@/components/rajasthan/RajasthanGuide";
import { RajasthanEnquiry } from "@/components/rajasthan/RajasthanEnquiry";
import { RAJASTHAN_WA_MESSAGE } from "@/lib/data/rajasthan";
import { absoluteUrl, breadcrumbJsonLd, siteConfig } from "@/lib/seo";
import { photo, image, imageAlt } from "@/lib/images";

const PATH = "/rajasthan-tour-packages";
/** Full title, brand included — `absolute` so the layout template does not append it again. */
const TITLE = "Rajasthan Tour Packages | Jaipur, Jodhpur, Jaisalmer & Udaipur | TheTravelKart";
const DESCRIPTION =
  "Explore Rajasthan tour packages with TheTravelKart. Customized Jaipur, Jodhpur, Jaisalmer and Udaipur trips with private cabs, handpicked hotels and personal travel assistance.";
const HERO = "rj-hero";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    "Rajasthan tour packages",
    "Rajasthan holiday packages",
    "Rajasthan family tour packages",
    "Rajasthan honeymoon packages",
    "Rajasthan luxury tours",
    "Rajasthan desert tour",
    "Jaipur Jodhpur Jaisalmer Udaipur package",
    "Rajasthan packages from Delhi",
    "private cab Rajasthan tour",
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

export default function RajasthanLandingPage() {
  const cards = rajasthanPackageCards();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
      { name: "Rajasthan Tour Packages", path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: "Rajasthan",
      description: DESCRIPTION,
      url: absoluteUrl(PATH),
      touristType: ["Families", "Couples", "Heritage travellers", "Groups"],
      includesAttraction: [
        "Amber Fort", "Hawa Mahal", "City Palace, Jaipur", "Mehrangarh Fort",
        "Jaisalmer Fort", "Sam Sand Dunes", "Lake Pichola", "City Palace, Udaipur", "Pushkar Lake",
      ].map((name) => ({ "@type": "TouristAttraction", name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Rajasthan Tour Packages",
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
  ];

  return (
    <EnquiryProvider destination="Rajasthan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RajasthanHero />

      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-600/60">
          <Link href="/" className="hover:text-terracotta-700">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/destinations" className="hover:text-terracotta-700">Destinations</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-800">Rajasthan Tour Packages</span>
        </nav>
      </Container>

      <RajasthanPackages cards={cards} />
      <RajasthanWhyBook />
      <RajasthanStories />
      <RajasthanGuide />
      <RajasthanEnquiry />

      <MobileBottomCTA whatsappMessage={RAJASTHAN_WA_MESSAGE} hideFloatingActions />
    </EnquiryProvider>
  );
}
