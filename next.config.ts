import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: 'framerusercontent.com',
              port: '',
              pathname: '/images/**',
          },
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/**',
          }
      ]
  }
};feat

export default nextConfig;
