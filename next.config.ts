import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      // YouTube thumbnail facades rendered via next/image
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
