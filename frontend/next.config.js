module.exports = {
    async rewrites() {
        return [
            {
                source: '/auth/:path*',
                destination: 'http://localhost:8080/auth/:path*' // Proxy to Backend
            }
        ]
    }
}