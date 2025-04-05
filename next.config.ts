import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'default', // Disables strict domain checking
    remotePatterns: [
      {
        protocol: 'https', // Allow both http and https
        hostname: '**', // Matches all hostnames
      },
    ],
  },
};

export default nextConfig;
