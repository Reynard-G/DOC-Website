/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['imgs.milklegend.xyz'],
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
});

const nextSafe = require('next-safe');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: nextSafe({ isDev }),
      },
    ];
  },
}