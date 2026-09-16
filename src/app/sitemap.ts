import type { MetadataRoute } from "next";
import { packages } from "@/lib/data/packages";
import { destinations } from "@/lib/data/destinations";
import { regions } from "@/lib/data/regions";
import { blogPosts } from "@/lib/data/blog";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/packages`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/destinations`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/hotels`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/cabs`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/activities`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/cancellation-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/refund-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${siteConfig.url}/packages/${pkg.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${siteConfig.url}/destinations/${d.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const regionRoutes: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${siteConfig.url}/destinations/${region.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // The "/<region>-tour-packages" landing pages — the main commercial entry
  // points, and previously missing from the sitemap entirely.
  const seoLandingRoutes: MetadataRoute.Sitemap = regions
    .filter((region) => Boolean(region.seoPath))
    .map((region) => ({
      url: `${siteConfig.url}${region.seoPath}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: post.publishedAt,
  }));

  return [
    ...staticRoutes,
    ...seoLandingRoutes,
    ...packageRoutes,
    ...regionRoutes,
    ...destinationRoutes,
    ...blogRoutes,
  ];
}
