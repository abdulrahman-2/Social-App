/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tarmeezacademy.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tarmeezacademy.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
