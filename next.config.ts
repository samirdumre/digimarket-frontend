import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "http://192.176.172.153/api",
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
        hostname: "192.176.172.153",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
