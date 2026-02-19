import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["api", "store"],
};

export default nextConfig;
