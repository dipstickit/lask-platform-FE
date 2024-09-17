/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/:slug',
          destination: '/pages/:slug',
        },
      ],
    };
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: (() => {
      // Lấy URL từ biến môi trường hoặc sử dụng giá trị mặc định
      const apiPath =
        process.env.API_PATH ??
        process.env.NEXT_PUBLIC_API_PATH ??
        'http://localhost';

      try {
        // Kiểm tra nếu URL hợp lệ, nếu không sẽ throw error
        const url = new URL(apiPath);
        return [
          {
            protocol: url.protocol.slice(0, -1), // Bỏ dấu ":" ở cuối protocol
            hostname: url.hostname, // Lấy hostname từ URL
          },
        ];
      } catch (error) {
        console.error('Invalid URL:', apiPath, error);
        // Trả về remotePatterns rỗng nếu URL không hợp lệ
        return [];
      }
    })(),
  },
};

module.exports = nextConfig;
