import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // @ts-ignore
  allowedDevOrigins: ["192.168.1.10"],
};

export default nextConfig;
