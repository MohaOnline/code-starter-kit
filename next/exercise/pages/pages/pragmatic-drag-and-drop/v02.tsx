'use client'; // Next.js 15 必须声明，因为拖拽是纯前端交互

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {createPortal} from 'react-dom';
import invariant from 'tiny-invariant';

// MUI 组件库
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Stack,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Pragmatic Drag and Drop 核心库
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {getReorderDestinationIndex} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {reorder} from '@atlaskit/pragmatic-drag-and-drop/reorder';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';

// --- 类型定义 ---

type Item = {
  id: string;
  label: string;
};

type ListContextValue = {
  reorderItem: (startIndex: number, indexOfTarget: number, closestEdgeOfTarget: Edge | null) => void;
  instanceId: symbol;
};

const ListContext = createContext<ListContextValue | null>(null);

// --- 辅助组件：蓝色指示线 ---
// 当拖拽悬停时，显示这条线告诉用户会插入到哪里
const DropIndicator = ({edge}: { edge: Edge }) => {
  return (
    <Box
      sx={{
        position:        'absolute',
        zIndex:          10,
        height:          '2px',
        backgroundColor: '#1976d2', // MUI Primary Blue
        left:            0,
        right:           0,
        // 根据 edge 决定线是在顶部还是底部
        top:           edge === 'top' ? '-1px' : undefined,
        bottom:        edge === 'bottom' ? '-1px' : undefined,
        pointerEvents: 'none', // 防止线本身干扰鼠标事件
      }}
    />
  );
};

// --- 子组件：列表项 (ListItem) ，拖动对象 ---
function ListItem({item, index}: { item: Item; index: number }) {
  const {reorderItem, instanceId} = useContext(ListContext)!;

  const elementRef = useRef<HTMLDivElement>(null);        // 整个行
  const dragHandleRef = useRef<HTMLButtonElement>(null);  // 拖拽手柄

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isDragging, setIsDragging] = useState(false);    // 自己是否在拖动状态

  // 这里的 data 用于传递给 monitor
  const itemData = useMemo(() => ({index, instanceId, item}), [index, instanceId, item]);

  useEffect(() => {
    const element = elementRef.current;
    const dragHandle = dragHandleRef.current;
    invariant(element && dragHandle);

    return combine( // 先执行每一句，每一句都会返回自的 cleanup，再返回统一调用所有 cleanup 的函数回收所有资源。
      // 1. 设置为拖拽源 (Draggable)
      draggable({
        element:        dragHandle, // 只有点击这个手柄才能拖动
        getInitialData: () => itemData,
        onGenerateDragPreview({nativeSetDragImage}) {
          // 自定义拖拽时的“幽灵图”，解决浏览器默认样式太丑或包含不必要背景的问题
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({x: '16px', y: '8px'}),
            render({container}) {
              // 这里我们创建一个 Portal 渲染简单的预览
              const root = createPortal(
                <Paper sx={{p: 2, width: 300, bgcolor: 'background.paper'}}>
                  <Typography>{item.label}</Typography>
                </Paper>,
                container
              );
              return () => {
              }; // 清理函数
            },
          });
        },
        onDragStart: () => {
          setIsDragging(true);
          console.log(`[Item] 开始拖拽: ${item.label} (Index: ${index})`);
        },
        onDrop:      () => setIsDragging(false),
      }),

      // 2. 设置为放置目标 (Drop Target)
      dropTargetForElements({
        element,
        canDrop:     ({source}) => {
          // 安全检查：只允许同一个列表实例内的元素互相拖拽
          return source.data.instanceId === instanceId;
        },
        getData:     ({input}) => {
          // 核心魔法：计算鼠标相对于元素的边缘 (Top/Bottom)
          return attachClosestEdge(itemData, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDragEnter: ({self}) => {
          const edge = extractClosestEdge(self.data);
          setClosestEdge(edge);
          console.log(`[Item] 拖拽进入 ${item.label}，靠近边缘: ${edge}`);
        },
        onDrag:      ({self}) => {
          // 持续更新边缘检测结果
          const edge = extractClosestEdge(self.data);
          setClosestEdge(edge);
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop:      () => setClosestEdge(null),
      })
    );
  }, [item, index, instanceId, itemData]);

  return (
    <Box sx={{position: 'relative', mb: 1}}>
      <Paper
        ref={elementRef}
        elevation={isDragging ? 0 : 1}
        sx={{
          p:               2,
          display:         'flex',
          alignItems:      'center',
          opacity:         isDragging ? 0.4 : 1, // 拖拽时变半透明
          backgroundColor: isDragging ? 'grey.100' : 'white',
          transition:      'background-color 0.2s',
        }}
      >
        {/* 拖拽手柄 */}
        <IconButton ref={dragHandleRef} sx={{cursor: 'grab', mr: 1}}>
          <DragIndicatorIcon color="action"/>
        </IconButton>

        <Typography sx={{flexGrow: 1, fontWeight: 500}}>{item.label}</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label="Todo" size="small" color="primary" variant="outlined"/>
          <Avatar sx={{width: 24, height: 24, fontSize: 12}}>U</Avatar>
          {/* 模拟菜单按钮 (无功能，仅作展示) */}
          <IconButton size="small"><MoreVertIcon/></IconButton>
        </Stack>
      </Paper>

      {/* 视觉引导线 */}
      {closestEdge && <DropIndicator edge={closestEdge}/>}
    </Box>
  );
}


const initialItems: Item[] = [
  {id: '1', label: '🚀 设置 Next.js 15 项目'},
  {id: '2', label: '🎨 集成 Material UI (MUI)'},
  {id: '3', label: '📦 安装 Pragmatic Drag and Drop'},
  {id: '4', label: '🧩 编写 ListItem 组件'},
  {id: '5', label: '👀 实现 DropIndicator 视觉反馈'},
];

// page
// --- 父组件：列表容器 (List) 默认页面 ---
export default function DraggableList() {
  const [items, setItems] = useState(initialItems);

  // 用于隔离不同列表实例的 ID，区分同列拖放还是异列拖放。
  const [instanceId] = useState(() => Symbol('list-instance'));

  // 核心排序逻辑
  const reorderItem = useCallback((startIndex: number, indexOfTarget: number, closestEdgeOfTarget: Edge | null) => {

    // 使用官方提供的工具函数计算最终的目标索引
    // 这比手动写 if (edge === 'bottom') index + 1 更健壮
    const finishIndex = getReorderDestinationIndex({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
      axis: 'vertical',
    });

    if (finishIndex === startIndex) return; // 位置没变，不用更新

    console.log(`%c[Reorder] 从 ${startIndex} 移动到 ${finishIndex}`, 'color: green; font-weight: bold;');

    setItems((currentItems) => {
      // 使用官方的 reorder 工具函数进行数组重排
      return reorder({
        list: currentItems,
        startIndex,
        finishIndex,
      });
    });
  }, []);

  useEffect(() => {
    // 启动全局监听器
    return monitorForElements({
      canMonitor: ({source}) => source.data.instanceId === instanceId,
      onDrop:     ({location, source}) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceIndex = source.data.index as number;
        const targetIndex = target.data.index as number;

        // 提取目标边缘信息 (top/bottom)
        const closestEdgeOfTarget = extractClosestEdge(target.data);

        reorderItem(sourceIndex, targetIndex, closestEdgeOfTarget);
      },
    });
  }, [instanceId, reorderItem]);

  // 创建 Context 的值对象，包含重排序函数和实例ID
  // 使用 useMemo 优化性能，避免每次渲染都创建新对象导致子组件不必要的重新渲染
  const contextValue = useMemo(() => ({reorderItem, instanceId}), [reorderItem, instanceId]);
  return (
    <ListContext.Provider value={contextValue}>
      <Box sx={{maxWidth: 600, mx: 'auto', mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2}}>
        <Typography variant="h5" gutterBottom sx={{mb: 3}}>
          Next.js + MUI 拖拽排序
        </Typography>

        <Box>
          {items.map((item, index) => (
            <ListItem key={item.id} item={item} index={index}/>
          ))}
        </Box>
      </Box>
    </ListContext.Provider>
  );
}
