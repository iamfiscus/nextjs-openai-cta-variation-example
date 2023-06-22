/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
}

module.exports = nextConfig
// // next.config.js
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'oaidalleapiprodscus.blob.core.windows.net',
//         port: '',
//         pathname: '/*',
//       },
//     ],
//   },
// }
