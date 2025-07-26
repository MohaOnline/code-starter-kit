# Topics 编辑器测试指南

## 功能测试清单

### 1. 页面加载测试
- [ ] 访问 `/notebooks/topics/mgmt/augment` 页面正常加载
- [ ] 左侧显示 topics 列表
- [ ] 右侧显示操作区
- [ ] 类型过滤器正常显示

### 2. 数据显示测试
- [ ] Topics 以树形结构正确显示
- [ ] 层级关系正确（子 topics 有缩进）
- [ ] Topic 信息完整显示（标题、类型、备注、ID等）
- [ ] 类型过滤器包含所有可用类型

### 3. 选择功能测试
- [ ] 点击 topic 能正确选中
- [ ] 选中的 topic 有高亮显示
- [ ] 右侧操作区显示选中 topic 的信息
- [ ] 表单字段正确填充数据

### 4. 编辑功能测试
- [ ] 修改标题字段
- [ ] 修改类型选择
- [ ] 修改备注内容
- [ ] 保存按钮正常工作
- [ ] 取消按钮恢复原始状态

### 5. 新建功能测试
- [ ] "之前"按钮创建新 topic
- [ ] "之后"按钮创建新 topic
- [ ] "子级"按钮创建新 topic
- [ ] "在最前位置新增"按钮（无选中时）
- [ ] 新建的 topic 正确标记为"新建"
- [ ] 新建后自动选中新 topic

### 6. 删除功能测试
- [ ] 删除按钮仅在选中非新建 topic 时显示
- [ ] 删除前有确认提示
- [ ] 有子 topics 的 topic 不能删除
- [ ] 删除成功后刷新列表

### 7. 拖拽功能测试
- [ ] 拖拽手柄（⋮⋮）正常显示
- [ ] 可以拖拽 topic 到其他位置
- [ ] 拖拽到蓝色区域调整同级位置
- [ ] 拖拽到绿色区域成为子级
- [ ] 不能将父级拖到子级中
- [ ] 拖拽后位置正确更新

### 8. 过滤功能测试
- [ ] 选择不同类型正确过滤显示
- [ ] "全部类型"显示所有 topics
- [ ] 过滤后仍保持树形结构
- [ ] 过滤不影响编辑功能

### 9. 通知系统测试
- [ ] 成功操作显示绿色 toast
- [ ] 错误操作显示红色 toast
- [ ] Toast 自动消失
- [ ] 可以手动关闭 toast

### 10. 响应式测试
- [ ] 大屏幕左右布局正常
- [ ] 小屏幕上下布局正常
- [ ] 移动设备触摸操作正常

## API 测试

### 获取 Topics
```bash
curl -X GET http://localhost:3000/api/notebooks/topics/augment
```

### 获取特定类型的 Topics
```bash
curl -X GET "http://localhost:3000/api/notebooks/topics/augment?type_id=3"
```

### 创建新 Topic
```bash
curl -X POST http://localhost:3000/api/notebooks/topics/augment \
  -H "Content-Type: application/json" \
  -d '{"title":"测试Topic","note":"测试备注","type_id":3,"pid":0}'
```

### 更新 Topic
```bash
curl -X PUT http://localhost:3000/api/notebooks/topics/augment \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"更新的标题","note":"更新的备注","type_id":3}'
```

### 删除 Topic
```bash
curl -X POST http://localhost:3000/api/notebooks/topics/augment/delete \
  -H "Content-Type: application/json" \
  -d '{"id":1}'
```

### 批量更新位置
```bash
curl -X POST http://localhost:3000/api/notebooks/topics/augment/updatePositions \
  -H "Content-Type: application/json" \
  -d '{"topics":[{"id":1,"pid":0,"weight":"001"},{"id":2,"pid":0,"weight":"002"}]}'
```

## 已知问题

### 修复的问题
1. ✅ Tailwind CSS 动态类名问题 - 使用固定类名映射
2. ✅ BigInt 类型处理 - 使用 handleBigInt 函数
3. ✅ Toast 通知系统 - 实现自定义 Toast 组件

### 待优化项目
1. 🔄 拖拽体验优化 - 添加更多视觉反馈
2. 🔄 性能优化 - 大量数据时的虚拟滚动
3. 🔄 键盘快捷键支持
4. 🔄 批量选择和操作

## 测试数据

当前数据库中的测试数据：
- 力学 (id:1, type_id:3)
  - 运动 (id:8, pid:1, type_id:3)
- 电学 (id:2, type_id:3)
  - 电荷性质 (id:3, pid:2, type_id:3)
- 生物/医疗 (id:4, type_id:0)
- 体育赛事 (id:5, type_id:10)
- 家庭 (id:6, type_id:10)
- 人物关系 (id:7, type_id:0)

## 测试环境

- **浏览器**: Chrome, Firefox, Safari
- **设备**: 桌面、平板、手机
- **网络**: 正常网络、慢速网络
- **数据量**: 少量数据、大量数据
