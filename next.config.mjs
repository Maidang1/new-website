import getMdxConfig from "@next/mdx"
import VirtualModulesPlugin from "webpack-virtual-modules"
const withMDX = getMdxConfig()

const virtualModules = new VirtualModulesPlugin({
  'node_modules/module-foo.js': 'module.exports = { foo: "foo" };',
  'node_modules/module-bar.js': 'module.exports = { bar: "bar" };'
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx", 'md'],
  webpack: (config) => {
    config.plugins.push(virtualModules)
    console.log(config)
    return config;
  }
};

export default withMDX(nextConfig);
