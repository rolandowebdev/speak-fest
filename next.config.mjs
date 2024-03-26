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
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  redirects: async () => {
    return [
      {
        source: '/source',
        destination: 'https://github.com/rolandowebdev/speak-fest',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
