import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rxhgewzjxrtenbhgvpkp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
//https://rxhgewzjxrtenbhgvpkp.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
