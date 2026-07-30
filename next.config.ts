import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary images go through a custom loader (src/app/lib/cloudinary.ts)
    // and bypass the optimizer, so these patterns mainly cover the YouTube
    // thumbnails that still use the default loader.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      // YouTube thumbnail facades rendered via next/image
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    // No image frame on the site is wider than ~1200px, and every entry here is
    // another srcset candidate — i.e. another derived asset Cloudinary has to
    // generate and store. Dropping 2048/3840 also stops the non-srcset fallback
    // `src` from pointing at a 3840px render.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
