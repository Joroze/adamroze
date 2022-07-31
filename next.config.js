/** @type {import('next').NextConfig} */

import { withPlaiceholder } from '@plaiceholder/next';

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.cdninstagram.com',
        },
      ],
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['loremflickr.com'],
  },
};

module.exports = withPlaiceholder(nextConfig);
