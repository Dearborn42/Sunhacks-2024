/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinifyMode: true,
    images: {
        remotePatterns: [
        {hostname: 'res.cloudinary.com'},{hostname: 'cdn.pixabay.com'},{hostname: 'encrypted-tbn0.gstatic.com'}, {hostname: 'images.immediate.co.uk'}, {hostname: 'images.squarespace-cdn.com'}, {hostname: 'arc.stimg.co'},
        ],
        domains: ['lh3.googleusercontent.com']
    }
};

export default nextConfig;
