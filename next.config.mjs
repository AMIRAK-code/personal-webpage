/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Static export: disable built-in image optimisation (needs a server)
  images: { unoptimized: true },
  // Produce /about.html instead of /about/index.html so IONOS serves files directly
  trailingSlash: false,
}
export default nextConfig
