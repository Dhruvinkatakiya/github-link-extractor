/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
    domains: ['images.unsplash.com'], // 👈 Add this line
  },
}

module.exports = nextConfig