/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
				port: '',
				pathname: '/**',
			},
		],
		dangerouslyAllowSVG: true,
	},
}

export default nextConfig
