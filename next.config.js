/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
 
    formats: ["image/avif", "image/webp"],
 
    deviceSizes: [48, 96, 256, 640, 1080],
 
    imageSizes: [48, 96],
 
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;