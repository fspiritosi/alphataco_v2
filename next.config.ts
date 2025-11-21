import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    domains: [
      "res.cloudinary.com",
      "alphataco.45ee30224eb134edb9f3e6b88ff4871e.r2.cloudflarestorage.com",
      "pub-ebc20fbd8789479692a5fb4ea8d78bfe.r2.dev"

    ],
  },
  
};

export default nextConfig;
