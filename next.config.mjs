/** @type {import('next').Config} */
const nextConfig = {
    // [Certain] Izin mutlak untuk menyedot gambar dari luar
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'diligent-overpay-stingray.ngrok-free.dev',
                port: '',
                pathname: '/**', // Izinkan semua jalur dari peladen FastAPI-mu
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Izinkan domain fallback gambar sementara
                port: '',
                pathname: '/**',
            }
        ],
    },

    // [Likely] Membungkam peringatan Cross-Origin IP Privat / Tunnel
    experimental: {
        allowedDevOrigins: [
            "localhost:3000",
            "diligent-overpay-stingray.ngrok-free.dev",
            "100.122.180.111" // IP dari jaringanmu yang terdeteksi
        ]
    }
};

export default nextConfig;