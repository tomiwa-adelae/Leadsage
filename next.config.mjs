/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: "10mb", // ✅ Increase limit (Default is 1MB)
        },
      },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'pictures-nigeria.jijistatic.net',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'icon-library.com',
                port: ''
            },
            ]
    }

};

export default nextConfig;
