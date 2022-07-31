/** @type {import('next').NextConfig} */

import { withPlaiceholder } from '@plaiceholder/next';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
