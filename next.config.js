/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
    }, experimental: {
        serverActions: true
    }
}

module.exports = nextConfig;
