import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  env: {
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "app",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
