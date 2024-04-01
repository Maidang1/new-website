import getMdxConfig from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
const withMDX = getMdxConfig({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike]],
  },
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
  webpack: (config) => {
    return config;
  },
};

export default withMDX(nextConfig);
