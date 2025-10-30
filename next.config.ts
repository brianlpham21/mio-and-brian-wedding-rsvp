import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'ja', 'vi'], // English, Japanese, Vietnamese
    defaultLocale: 'en',
  },
  // Other Next.js config options can go here
};

export default nextConfig;
