# Changelog 003 - WaveSurfer v3 Audio Selection and Looping Features

## 新增功能概述
为 WaveSurfer v3 示例添加了音频片段选择和循环播放功能。

## 主要变更
1. 集成了 WaveSurfer.js 的 Regions 插件用于音频片段选择
2. 添加了音频片段循环播放功能
3. 实现了鼠标悬停时显示时间位置的功能
4. 更新了用户界面以支持新的控制选项

## 技术实现细节
- 使用 `RegionsPlugin` 实现音频片段选择功能
- 添加了 `playSelectedRegion` 和 `stopLooping` 函数来控制循环播放
- 实现了鼠标事件监听器来显示悬停时间
- 添加了新的状态管理 (`selectedRegion`, `isLooping`, `hoverTime`)
- 更新了 UI 组件以支持新的功能按钮

## 文件变更
- `src/app/examples/wavesurfer/v3/page.tsx` - 主要功能实现
- `src/app/examples/wavesurfer/v3/docs/requirements.md` - 更新需求文档
- `docs/changelog-003.md` - 记录此次更新

## 使用说明
1. 在波形图上点击并拖动来选择音频片段
2. 选择片段后会出现"循环播放选中区域"按钮
3. 点击该按钮开始循环播放选中的音频片段
4. 点击"停止循环"按钮或使用常规播放控制来停止循环播放
5. 鼠标悬停在波形图上时会显示当前的时间位置