/** @type {import('next').NextConfig} */
import os from "os";

const isDev = process.env.NODE_ENV === "development";
let allowedDevOrigins = [];

// 检查当前主机是否为 192.168.1.66
if (isDev) {
  const networkInterfaces = os.networkInterfaces();
  let currentHost = "localhost"; // 默认值

  // 遍历网络接口获取 IP
  for (let iface of Object.values(networkInterfaces)) {
    for (let addr of iface) {
      if (addr.family === "IPv4" && !addr.internal) {
        currentHost = addr.address;
        break;
      }
    }
  }

  // 如果当前主机是 192.168.1.66，添加 allowedDevOrigins
  if (currentHost === "192.168.1.66") {
    allowedDevOrigins = ["http://192.168.1.66"];
    allowedDevOrigins.push("192.168.1.66");
  } else if (currentHost.startsWith("192.168.")) {
    allowedDevOrigins.push(`http://${currentHost}`);
    allowedDevOrigins.push(`${currentHost}`);
  }
}

console.log("allowedDevOrigins", allowedDevOrigins);

const nextConfig = {
  allowedDevOrigins: allowedDevOrigins,
  experimental: { serverActions: { bodySizeLimit: "100mb" } },
  output: "standalone",
  transpilePackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // 添加重写规则，将 MathLive 字体请求重定向到正确路径
  async rewrites() {
    return [
      {
        source: "/_next/static/chunks/fonts/:path*",
        destination: "/fonts/:path*",
      },
      {
        source: "/_next/static/chunks/sounds/:path*",
        destination: "/sounds/:path*",
      },
    ];
  },
};

export default nextConfig;
