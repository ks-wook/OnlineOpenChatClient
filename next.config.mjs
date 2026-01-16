/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error'] } // console.error는 남김
      : false,
    },
};

export default nextConfig;
