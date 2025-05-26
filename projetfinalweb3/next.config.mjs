// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://projet-prog4e04.cegepjonquiere.ca:443/:path*',
          },
        ]
    },    images: {
      unoptimized: true
  }
}

export default nextConfig