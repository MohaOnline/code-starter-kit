# MCP 集成指南：Context7 和 Playwright 在 Trae/Cursor 中的使用

## 概述

Model Context Protocol (MCP) 是 Anthropic 开发的开放协议，允许 LLM 连接外部工具和数据源。本指南将详细介绍如何在 Trae 和 Cursor 中配置和使用 Context7 和 Playwright MCP。

## Context7 MCP

### 什么是 Context7？

Context7 是一个 MCP 服务器，用于解决 LLM 生成过时代码的问题。它动态获取最新的、版本特定的文档，并将其注入到 LLM 的上下文中。

### 在 Cursor 中配置 Context7

#### 方法 1：使用 Smithery 安装（推荐）

```bash
npx -y @smithery/cli@latest install @upstash/context7-mcp --client cursor --key <YOUR_SMITHERY_KEY>
```

#### 方法 2：手动配置

1. 打开 Cursor 设置：`File -> Settings -> Extensions -> Cursor`
2. 找到 MCP 部分，点击 "Add new global MCP server"
3. 配置如下：
   - **Name**: Context7
   - **Command**: `npx`
   - **Args**: `-y`, `@upstash/context7-mcp@latest`

#### 方法 3：直接编辑配置文件

编辑 `~/.cursor/mcp.json` 文件：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Context7 使用示例

#### 基本用法

在任何 Cursor 对话中，只需添加 `use context7` 即可：

```
创建一个 React 组件使用最新的 Next.js 15 特性
use context7
```

#### 自动调用规则

在 Cursor 设置的 Rules 部分添加：

```
当用户询问代码相关问题时，自动使用 context7 获取最新文档
```

#### 具体用例

1. **框架升级**：
   ```
   将这个 Next.js 13 项目升级到 Next.js 15，使用最新的 App Router 特性
   use context7
   ```

2. **新库集成**：
   ```
   集成 Prisma ORM 到我的项目中，使用最新的最佳实践
   use context7
   ```

3. **API 使用**：
   ```
   使用最新的 OpenAI API 创建聊天功能
   use context7
   ```

## Playwright MCP

### 什么是 Playwright MCP？

Playwright MCP 是一个提供浏览器自动化功能的 MCP 服务器，使 LLM 能够与网页交互、截图、生成测试代码和执行 JavaScript。

### 在 Cursor 中配置 Playwright MCP

#### 方法 1：Microsoft 官方版本

1. 打开 Cursor 设置：`Settings -> MCP -> Add new MCP Server`
2. 配置：
   - **Name**: Playwright
   - **Command**: `npx`
   - **Args**: `@playwright/mcp`

#### 方法 2：ExecuteAutomation 版本

```bash
npm install -g @executeautomation/mcp-playwright
```

配置文件：
```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "npx",
      "args": ["@executeautomation/mcp-playwright"]
    }
  }
}
```

### Playwright MCP 使用示例

#### 1. 网页截图和分析

```
请访问 https://example.com 并截图，然后分析页面结构
```

#### 2. 自动化测试生成

```
为登录页面生成 Playwright 测试代码，包括：
- 输入用户名和密码
- 点击登录按钮
- 验证登录成功
```

#### 3. 网页数据抓取

```
从 https://news.ycombinator.com 抓取前10条新闻标题和链接
```

#### 4. 表单自动填写

```
自动填写联系表单，包括姓名、邮箱和消息字段
```

#### 5. BDD 测试场景

```
创建一个 BDD 风格的测试：
给定用户在购物网站首页
当用户搜索"笔记本电脑"
那么应该显示相关产品列表
```

## 在 Trae 中的配置

### 通用 MCP 配置

Trae 支持标准的 MCP 协议，配置方式类似：

1. 打开 Trae 设置
2. 找到 MCP 或扩展部分
3. 添加新的 MCP 服务器
4. 使用相同的命令和参数

### 配置示例

```json
{
  "mcp_servers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

## 高级用例组合

### 1. 全栈开发工作流

```
使用 context7 获取最新的 Next.js 15 文档，然后用 Playwright 测试生成的组件
use context7

创建一个响应式导航组件，然后为其编写端到端测试
```

### 2. 文档驱动开发

```
基于最新的 React 19 文档创建一个数据获取组件
use context7

然后使用 Playwright 验证组件在不同网络条件下的行为
```

### 3. API 测试自动化

```
使用最新的 FastAPI 文档创建 REST API
use context7

然后用 Playwright 生成 API 端点的自动化测试
```

## 故障排除

### 常见问题

1. **ERR_MODULE_NOT_FOUND**：
   - 解决方案 1：使用 `bunx` 替代 `npx`
   - 解决方案 2：使用 `deno run --allow-net npm:@upstash/context7-mcp`

2. **MCP 服务器无响应**：
   - 重启 Cursor/Trae
   - 检查网络连接
   - 验证配置文件语法

3. **权限问题**：
   - 确保有执行 npx 的权限
   - 检查防火墙设置

### 调试技巧

1. 查看 MCP 服务器日志
2. 使用 `--verbose` 参数获取详细输出
3. 测试单独的 MCP 命令

## 最佳实践

1. **定期更新**：保持 MCP 服务器为最新版本
2. **合理使用**：避免在每个请求中都使用 context7
3. **组合使用**：结合多个 MCP 服务器提高效率
4. **测试验证**：使用 Playwright 验证 context7 生成的代码
5. **文档记录**：记录自定义配置和工作流

## 参考资源

- [Context7 GitHub](https://github.com/upstash/context7)
- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [Cursor MCP 文档](https://docs.cursor.com/context/mcp)
- [Model Context Protocol 规范](https://modelcontextprotocol.io/)

---

*本指南基于最新的 MCP 协议和工具版本编写，建议定期查看官方文档获取最新信息。*