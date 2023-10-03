/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "headlessroadev.wpengine.com/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Add dangerouslyAllowSVG: true
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
