/** * @type {import('next').NextConfig}*/
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:5000/api/",
  },
};

module.exports = nextConfig;
