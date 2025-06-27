import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'http://192.176.172.153:8000'
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'standalone',
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
};

export default nextConfig;
