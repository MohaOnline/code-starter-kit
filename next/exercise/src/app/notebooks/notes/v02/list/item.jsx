import React, {createContext, forwardRef, memo, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal} from 'react-dom';
import NextLink from "next/link";
import {useRouter} from 'next/navigation';

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, IconButton, Input,
  Link, ListSubheader, Menu, MenuItem, OutlinedInput,
  Stack, Tabs, Tab, TextField, Toolbar, Tooltip, Typography,
  useTheme
} from '@mui/material';

// @atlaskit/pragmatic-drag-and-drop
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {monitorForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {preventUnhandled} from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {DropIndicator} from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import {attachClosestEdge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {getReorderDestinationIndex} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'; // 前后移动时重算 targetIndex
import {reorder} from '@atlaskit/pragmatic-drag-and-drop/reorder';  // 移动数组元素

import {useStatus} from "@/app/lib/atoms";

export function Item({item, note}) {

  const [status, setStatus] = useStatus();
  const router = useRouter();

  // draggable
  const draggerRef = useRef(null);
  const [isSelfDragging, setIsSelfDragging] = useState(false);
  const itemData = useMemo(() => ({note, item}), [note, item.index]);

  // dropTargets
  const [indicatorEdge, setIndicatorEdge] = useState(null); // top / bottom
  const containerRef = useRef(null);

  useEffect(() => {
    if (!draggerRef.current) {
      return;
    }

    return combine(
        // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
        draggable({
          canDrag(args) {
            console.log('canDrag:', args, status.selectedTypeID);
            return !!status.selectedTypeID; // 强制返回 true / false
          },
          element: draggerRef.current, // 只有点击这个手柄才能拖动
          onDragStart() {
            setIsSelfDragging(true);
            document.body.classList.add('is-dragging');
          },
          onDrop() {
            setIsSelfDragging(false);
            document.body.classList.remove('is-dragging');
          },
          // 添加为 source.data: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/recipes/typing-data/
          // 用于释放时更新数据库
          getInitialData() { return itemData; },
          onGenerateDragPreview({nativeSetDragImage, source, location}) {
            // Hint the browser that this is a move operation
            // This sometimes prevents the cursor from switching to the "plus/copy" icon

            // 设置拖拽效果为 move，这会显示移动光标而不是复制光标
            if (location.current.dropTargets.length > 0) {
              // 当在可放置区域上时，设置为 move 效果
              location.current.dropTargets.forEach(target => {
                if (target.element.dataset) {
                  target.element.dataset.dragEffect = 'move';
                }
              });
            }
          },
        }),

        // Drop
        dropTargetForElements({
          element: containerRef.current,
          onDragLeave: () => setIndicatorEdge(null),
          onDrop: () => setIndicatorEdge(null),
          canDrop({source}) {
            // console.dir(source);
            return source.data?.note?.id !== note?.id && source.data?.note?.tid === note?.tid;
          },
          getData({input}) { // 拖动时经过本对象时实时调用，返回内容合并到 target.data
            // 核心魔法：计算鼠标相对于元素的边缘 (Top/Bottom)
            return attachClosestEdge(itemData, {  // itemData 为初始数据
              element: containerRef.current,
              input, // 鼠标位置数据
              allowedEdges: ['top', 'bottom'],
            });
          },
          onDragEnter({self}) {
            const edge = extractClosestEdge(self.data);
            setIndicatorEdge(edge);
          },
          onDrag({self}) {
            // 持续更新边缘检测结果
            const edge = extractClosestEdge(self.data);
            setIndicatorEdge(edge);
          },
        }),

    );
  }, [status.selectedTypeID, itemData]);

  const click2Details = useCallback(() => {
    router.push(`/notebooks/notes/v02/list?noteId=${note.id}`);
  }, [router, note.id]);

  // Template Default
  return (<>
    <div ref={containerRef} className={'relative border p-2'} draggable="false">
      {/* Title。 有部分 note 没有 title */}
      {(note.tid === '999' || note.tid === '997' || note.tid === '61' || note.tid === '31' || note.tid === '21') &&
          <Typography ref={draggerRef} className={`${status.selectedTypeID ? 'cursor-grab active:cursor-grabbing' : ''} flex justify-between`} variant="h6" gutterBottom>
            {note.title}
            <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
          </Typography>
      }

      {/* ID 英语听力还不知道如何显示 */}
      {note.tid !== '999' && note.tid !== '997' && note.tid !== '61' && note.tid !== '31' && note.tid !== '21' && note.tid !== '16' &&
          <Typography ref={draggerRef} className={`${status.selectedTypeID ? 'cursor-grab active:cursor-grabbing' : ''} flex justify-between`} variant="h6" gutterBottom
                      dangerouslySetInnerHTML={{__html: note.id}}/>
      }

      {/* body_script */}
      {note.tid === '999' &&
      <div className={'cursor-pointer ps-8 line-clamp-2'} onClick={click2Details}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
      }

      {/* question */}
      {note.tid === '16' &&
        <div className={``}>
          <Typography ref={draggerRef} variant="h6" dangerouslySetInnerHTML={{__html: `翻译：<span>[ID: ${note.id}]</span> ${note.question}`}}/>
          <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
        </div>
      }
      {/* Answer */}

      {/* gap 两个 item 中间的距离：有 border 所以正好 2px */}
      {indicatorEdge && (<DropIndicator edge={indicatorEdge} gap={'2px'}/>)}
    </div>
  </>);
}