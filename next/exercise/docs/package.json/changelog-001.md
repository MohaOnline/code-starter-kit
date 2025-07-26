# Changelog 001

## 计划

- 修改 package.json 的 scripts 以支持 Bun 运行 Next.js 命令。
- 添加说明文档。
- 创建批量笔记语音生成脚本。

## 已完成

- 更新 scripts 为使用 `bun --bun next` 命令。
- 测试配置。
- ✅ **批量笔记语音生成脚本** (2024-12-20)
  - 创建 `scripts/fetch-azure-tts-notes.js` 脚本
  - 支持从 `notebooks_notes` 表批量读取笔记数据
  - 解析 `body_script` 字段中的 HTML span 元素
  - 提取 `aria-label` 和 `data-voice-id` 属性
  - 使用 Azure TTS 生成中文语音文件
  - 按 tid 和 voiceId 组织文件存储结构
  - 支持文件存在检查，避免重复生成
  - 每次 Azure TTS 交互间隔 1 秒，避免频率限制
  - 完整的错误处理和进度跟踪
  - 创建详细的使用文档 `docs/scripts/fetch-azure-tts-notes.md`