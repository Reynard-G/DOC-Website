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
