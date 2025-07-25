import React from "react";
import type { Metadata } from "next";

// 禁用父级布局，创建完全独立的HTML结构
export const metadata: Metadata = {
  title: "干净的 HTML 测试页面",
};

export default function HtmlV0Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {children}
        <script src="/script/main.js"></script>
      </body>
    </html>
  );
}
