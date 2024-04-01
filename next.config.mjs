import getMdxConfig from '@next/mdx';
import { remarkCodeHike } from '@code-hike/mdx';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
const withMDX = getMdxConfig({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkToc], [remarkCodeHike]],
    rehypePlugins: [[rehypeSlug]],
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
