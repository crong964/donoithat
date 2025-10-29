import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '32mb'
    }
  },
  reactStrictMode: false
};

export default nextConfig;
