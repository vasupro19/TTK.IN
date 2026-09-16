import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75, 90],
    // Photography is served from public/img — see src/lib/images. No remote
    // patterns: nothing on the site loads images from another origin.
    formats: ["image/avif", "image/webp"],
    // The stored masters are 1600px wide, so asking for 2048 or 3840 variants
    // only costs encoding time — it cannot add detail that is not in the file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      {
        // The Himachal landing page moved to the fuller, more searched phrase.
        // Permanent so the old URL's ranking follows it.
        source: "/himachal-tour-packages",
        destination: "/himachal-pradesh-tour-packages",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
