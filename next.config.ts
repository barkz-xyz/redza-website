import type { NextConfig } from "next";
import { umamiConfig } from './src/umami';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async rewrites() {
    const config = umamiConfig(process.env);
    if (!config) return [];
    // Only the tracker and collection endpoint belong on the public Redza origin.
    return [['/stats/script.js', config.scriptUrl], ['/stats/api/send', config.collectUrl]].map(([source, destination]) => ({
      source,
      has: [{ type: 'host' as const, value: config.hostname.replaceAll('.', '\\.') }],
      destination,
    }));
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
