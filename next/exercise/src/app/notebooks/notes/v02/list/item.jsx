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

export function Item({note}) {

  const [status, setStatus] = useStatus();
  const router = useRouter();

  //
  const draggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isSelfDragging, setIsSelfDragging] = useState(false);
  const itemData = useMemo(() => ({...note}), [note]);

  useEffect(() => {
    if (!draggerRef.current) {
      return;
    }

    return combine(
        // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
        draggable({
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
          // onGenerateDragPreview({nativeSetDragImage}) {
          //   // Hint the browser that this is a move operation
          //   // This sometimes prevents the cursor from switching to the "plus/copy" icon
          // },
        }),
    );
  }, []);

  const click2Details = useCallback(() => {
    router.push(`/notebooks/notes/v02/list?noteId=${note.id}`);
  }, [router, note.id]);

  // Template Default
  return (<>
    <div className={'border p-2'} draggable="false">
      {/* Title。 有部分 note 没有 title */}
      {(note.tid === '999' || note.tid === '997' || note.tid === '61' || note.tid === '31' || note.tid === '21') &&
          <Typography ref={draggerRef} className={'cursor-grab active:cursor-grabbing flex justify-between'} variant="h6" gutterBottom>
            {note.title}
            <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
          </Typography>
      }

      {/* ID 英语听力还不知道如何显示 */}
      {note.tid !== '999' && note.tid !== '997' && note.tid !== '61' && note.tid !== '31' && note.tid !== '21' && note.tid !== '16' &&
          <Typography ref={draggerRef} className={'cursor-grab active:cursor-grabbing flex justify-between'} variant="h6" gutterBottom dangerouslySetInnerHTML={{__html: note.id}}/>
      }

      {/* body_script */}
      {note.tid === '999' &&
      <div className={'cursor-pointer ps-8 line-clamp-2'} onClick={click2Details}
           dangerouslySetInnerHTML={{__html: note.body_script}}/>
      }

      {/* question */}
      {note.tid === '16' &&
        <div className={``}>
          <Typography variant="h6" dangerouslySetInnerHTML={{__html: `翻译：<span>[ID: ${note.id}]</span> ${note.question}`}}/>
          <Button className={'absolut mr-0'} size="small" onClick={click2Details}>Show</Button>
        </div>
      }
    </div>
  </>);
}