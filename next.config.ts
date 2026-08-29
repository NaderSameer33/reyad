import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses with gzip
  compress: true,

  // Optimize heavy packages — reduces bundle sizes via tree-shaking hints
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "canvas-confetti",
    ],
  },

  // Next.js Image optimization
  images: {
    // Modern formats: WebP + AVIF for supported browsers
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints matching our Tailwind config
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256],
    // Minimum cache time for optimized images (7 days)
    minimumCacheTTL: 604800,
  },

  // Custom response headers for caching static assets
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
