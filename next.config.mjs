/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary (current media backend).
      { protocol: "https", hostname: "res.cloudinary.com" },
      // DigitalOcean Spaces (media bucket + CDN edge), used when DO_SPACES_* is set.
      { protocol: "https", hostname: "**.digitaloceanspaces.com" },
      { protocol: "https", hostname: "**.cdn.digitaloceanspaces.com" },
    ],
  },
};

export default nextConfig;
