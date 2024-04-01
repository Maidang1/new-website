import getMdxConfig from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
const withMDX = getMdxConfig({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkToc], [remarkCodeHike]],
    rehypePlugins: [[rehypeSlug], [rehypeToc]],
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
