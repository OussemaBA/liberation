import createNextIntlPlugin from 'next-intl/plugin';

// Explicitly link the request configuration to ensure locale injection
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  devIndicators: {
    appIsrStatus: false,
  },
};

export default withNextIntl(nextConfig);
