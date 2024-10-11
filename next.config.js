/** @type {import('next').NextConfig} */

const startDataSync = require('./src/utils/dataSync'); // Imports the data sync function.

const nextConfig = {
  images: {
    remotePatterns: [
      {
        /* Allows for the fetching of Github profile pictures */
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      startDataSync(); // Start The data syncing between Github and the database
    }
    return config;
  },
};

module.exports = nextConfig;
