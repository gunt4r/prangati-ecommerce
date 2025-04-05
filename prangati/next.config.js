/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER: "http://localhost:3000/",
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
