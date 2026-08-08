import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:3005';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['*.ngrok-free.app', 'localhost:3000'],
  
  async rewrites() {
    return [
      {
        // Proxy all /api requests to the backend
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  
  // Disable Turbopack indicators to keep things clean
  devIndicators: {
    appIsrStatus: false,
  },
};

export default withNextIntl(nextConfig);
