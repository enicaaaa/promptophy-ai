/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
        {
            hostname: "lh3.googleusercontent.com",
        },
        
        ],
    },
};

export default nextConfig;
