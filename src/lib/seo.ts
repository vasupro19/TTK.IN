export const siteConfig = {
  name: "TheTravelKart",
  legalName: "TheTravelKart",
  tagline: "The world, your way.",
  description:
    "TheTravelKart plans custom holidays across Himachal, Kashmir, Ladakh, Spiti, Uttarakhand, Rajasthan, Kerala, Goa, the North East and beyond — with verified stays, transparent pricing and a travel expert on WhatsApp from enquiry to homecoming.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetravelkart.in",
  domain: "thetravelkart.in",
  /** Primary line, also used for WhatsApp. */
  phone: "+91 98827 02527",
  phoneRaw: "919882702527",
  phoneDisplay: "9882702527",
  /** Secondary line. */
  altPhone: "+91 98161 00105",
  altPhoneRaw: "919816100105",
  altPhoneDisplay: "9816100105",
  whatsapp: "919882702527",
  whatsappMessage: "Hi TheTravelKart, I want help planning my trip.",
  email: "thetravelkart@gmail.com",
  address: "Himachal Pradesh, India",
  foundingYear: 2018,
  socials: {
    instagram: "https://www.instagram.com/thetravelkart.in/",
    facebook: "https://www.facebook.com/thetravelkarttravels",
  },
  socialHandles: {
    instagram: "@thetravelkart.in",
    facebook: "thetravelkarttravels",
  },
};

/** Builds a wa.me deep link with a contextual prefilled message. */
export function whatsappLink(message: string = siteConfig.whatsappMessage): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(raw: string = siteConfig.phoneRaw): string {
  return `tel:+${raw}`;
}

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/icon"),
    description: siteConfig.description,
    telephone: [siteConfig.phone, siteConfig.altPhone],
    email: siteConfig.email,
    priceRange: "₹₹",
    areaServed: "IN",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Himachal Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      availableLanguage: ["en", "hi"],
    },
    sameAs: Object.values(siteConfig.socials),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function touristTripJsonLd(pkg: {
  title: string;
  summary: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.summary,
    image: pkg.image,
    url: absoluteUrl(`/packages/${pkg.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: pkg.price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/packages/${pkg.slug}`),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount,
    },
  };
}

export function productOfferJsonLd(pkg: {
  title: string;
  summary: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    description: pkg.summary,
    image: pkg.image,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: pkg.price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/packages/${pkg.slug}`),
      seller: { "@type": "TravelAgency", name: siteConfig.name },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount,
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    datePublished: post.publishedAt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
