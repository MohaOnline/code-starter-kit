# Changelog 004 - WaveSurfer v3 Debugging Enhancements

## 调试增强概述
为 WaveSurfer v3 示例添加了详细的日志记录和调试信息显示，以帮助诊断区域选择问题。

## 主要变更
1. 添加了详细的控制台日志记录，覆盖 WaveSurfer 初始化、区域选择事件等关键流程
2. 在 UI 中添加了调试信息显示区域，实时显示关键状态变量
3. 增加了组件重新渲染时的状态日志记录
4. 为按钮点击事件添加了日志记录

## 技术实现细节
- 在 WaveSurfer 初始化过程中添加了多个日志点
- 为所有 Regions 插件事件添加了日志记录（region-created, region-updated, region-update-end, region-click）
- 添加了调试信息显示区域，实时显示 selectedRegion、isLooping 和 hoverTime 状态
- 为组件的每次重新渲染添加了状态日志

## 文件变更
- `src/app/examples/wavesurfer/v3/page.tsx` - 添加调试日志和信息显示
- `docs/changelog-004.md` - 记录此次调试增强

## 使用说明
- 打开浏览器开发者工具查看控制台日志
- 观察 UI 中的调试信息区域以了解当前状态
- 测试区域选择功能并查看相关日志输出