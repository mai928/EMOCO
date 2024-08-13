
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
	swcMinify: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "admin.emocoegypt.com",
				port: '3000',
				pathname: "/admin/public/assets/images/**",
			},
		],
	},
};

export default nextConfig;



