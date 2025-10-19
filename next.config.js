/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: "C:\\Users\\shane\\OneDrive\\Documents\\GitHub\\eatmothership\\eatmothership.co",

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
