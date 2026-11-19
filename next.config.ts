import type { NextConfig } from "next";
import { umamiConfig } from './src/umami';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async rewrites() {
    const config = umamiConfig(process.env);
    if (!config) return [];
    // Collection uses a route handler so we can forward the trusted visitor IP.
    return [{
      source: '/stats/script.js',
      has: [{ type: 'host' as const, value: config.hostname.replaceAll('.', '\\.') }],
      destination: config.scriptUrl,
    }];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    }];
  },
};

export default nextConfig;
