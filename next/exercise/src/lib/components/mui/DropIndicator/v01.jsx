// https://github.com/atlassian/pragmatic-drag-and-drop/blob/main/packages/react-drop-indicator/src/internal/line.tsx
// https://atlassian.design/components/pragmatic-drag-and-drop/optional-packages/react-drop-indicator/about

import React from 'react';

import {Box} from '@mui/material';

export const DropIndicator = ({edge, gap = 0}) => {
  let adjustedGap = -2;
  if (gap) {adjustedGap = adjustedGap + gap;}

  return (
      <Box sx={{
        position: 'absolute',
        zIndex: 10,
        height: '2px',
        backgroundColor: 'rgb(102, 157, 241)', // MUI Primary Blue
        left: 0,
        right: 0,
        insetInlineStart: '8px',
        // 根据 edge 决定线是在顶部还是底部
        top: edge === 'top' ? `${adjustedGap}px` : undefined,
        bottom: edge === 'bottom' ? `${adjustedGap}px` : undefined,
        pointerEvents: 'none', // 防止线本身干扰鼠标事件

        // &::before is for the terminal
        '&::before': {
          display: 'block',
          content: '""',
          position: 'absolute',
          bgColor: 'var(--background-color)',
          bottom: '-3px',
          color: 'var(--foreground-color)',
          insetInlineStart: '-8px',
          zIndex: 20,
          boxSizing: 'border-box',
          width: '8px',
          height: '8px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgb(102, 157, 241)',
          // eslint-disable-next-line @atlaskit/design-system/use-tokens-shape
          borderRadius: '50%',
        },
      }}/>
  );
};