---
inclusion: always
---

# Next.js 路由配置说明

## 项目路由架构

当前 Next.js 应用采用混合路由模式：

### App Router（默认）
- 位置：`src/app/` 目录
- 这是项目的主要路由系统
- 使用 Next.js 15 的 App Router 架构
- 支持 React Server Components
- 布局文件：`src/app/layout.js`

### Pages Router（遗留）
- 位置：`pages/` 目录
- 仅用于特定的遗留页面
- 使用传统的 Pages Router 架构
- 主要用于示例和测试页面

## 开发指南

1. 新功能开发应使用 App Router（`src/app/` 目录）
2. 避免在 `pages/` 目录下创建新页面，除非有特殊需求
3. 两种路由系统可以共存，但建议逐步迁移到 App Router

## PWA 配置

项目已启用 PWA 功能：
- Service Worker 在生产环境自动注册
- 开发环境禁用 PWA 以便调试
- Manifest 文件：`public/manifest.json`
- 图标目录：`public/icons/`

### PWA 相关文件
- `next.config.mjs`：PWA 配置
- `public/manifest.json`：应用清单
- `src/app/layout.js`：包含 PWA meta 标签

## 注意事项

- App Router 和 Pages Router 的数据获取方式不同
- App Router 使用 `async/await` 和 Server Components
- Pages Router 使用 `getServerSideProps`、`getStaticProps` 等
