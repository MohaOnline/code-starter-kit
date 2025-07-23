# 本地字体缓存设置说明

## 问题背景
项目原本使用 Google Fonts 的 Geist 和 Geist Mono 字体，但在某些网络环境下可能无法访问 `fonts.googleapis.com`，导致字体加载失败。

## 解决方案
将 Google Fonts 下载到本地，避免网络依赖问题。

## 实施步骤

### 1. 创建字体目录
```bash
mkdir -p public/fonts
```

### 2. 下载字体文件
```bash
# 下载 Geist 字体
curl -o public/fonts/geist.woff2 https://fonts.gstatic.com/s/geist/v3/gyByhwUxId8gMEwcGFWNOITd.woff2

# 下载 Geist Mono 字体
curl -o public/fonts/geist-mono.woff2 https://fonts.gstatic.com/s/geistmono/v2/gyB4hws1JdgnKy56GB825bb3q30.woff2
```

### 3. 创建本地字体 CSS 文件
创建 `public/fonts/fonts.css` 文件，定义 `@font-face` 规则。

### 4. 更新项目配置

#### 移除 Google Fonts 导入
从所有 layout.js 文件中移除：
```javascript
import { Geist, Geist_Mono } from 'next/font/google';
```

#### 更新全局样式
在 `src/app/globals.css` 中添加：
```css
@import url('/fonts/fonts.css');

:root {
  --font-geist-sans: 'Geist', system-ui, sans-serif;
  --font-geist-mono: 'Geist Mono', monospace;
}
```

#### 更新 Layout 组件
在 HTML head 中添加字体 CSS 链接：
```html
<head>
  <link rel="stylesheet" href="/fonts/fonts.css" />
</head>
```

## 优势

1. **离线可用**: 字体文件存储在本地，无需网络连接
2. **加载速度**: 避免跨域请求，提高加载速度
3. **稳定性**: 不受 Google Fonts 服务状态影响
4. **隐私保护**: 避免向 Google 发送用户数据

## 文件结构
```
public/
├── fonts/
│   ├── fonts.css
│   ├── geist.woff2
│   └── geist-mono.woff2
└── ...
```

## 注意事项

1. 字体文件需要定期更新以获取最新版本
2. 确保字体文件的许可证允许本地托管
3. 可以考虑添加更多字重和字符集支持
4. 建议启用 gzip 压缩以减少字体文件大小

## 验证

启动开发服务器后，检查：
1. 浏览器开发者工具中字体是否正确加载
2. 网络面板中是否还有对 `fonts.googleapis.com` 的请求
3. 字体渲染效果是否正常