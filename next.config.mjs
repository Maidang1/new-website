import getMdxConfig from "@next/mdx"

const withMDX = getMdxConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx", 'md']
};

export default withMDX(nextConfig);
