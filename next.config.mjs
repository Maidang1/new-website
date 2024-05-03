/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "mdx", "md"],
	webpack: (config) => {
		return config;
	},
};

export default nextConfig;
