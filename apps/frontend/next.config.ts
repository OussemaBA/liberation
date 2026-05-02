import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.ngrok-free.app', 'localhost:3000'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3005/api/:path*',
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.ngrok-free.app'],
    },
  },
  // This helps with WebSocket and static assets when behind a proxy like ngrok
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
