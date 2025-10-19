import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: "C:\\Users\\shane\\OneDrive\\Documents\\GitHub\\eatmothership\\eatmothership.co",

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  experimental: {
    allowedDevOrigins: ['http://192.168.1.9:3456'],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
