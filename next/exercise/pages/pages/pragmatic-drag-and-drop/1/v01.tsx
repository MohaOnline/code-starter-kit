/** @jsxImportSource @emotion/react */

import React, {useCallback, useEffect, useRef, useState} from "react";

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import {css, jsx} from '@emotion/react';
import Image, {StaticImageData} from 'next/image';

import king from '../icons/king.png';
import pawn from '../icons/pawn.png';

import {EmotionJSX} from "@emotion/react/src/jsx-namespace";
import invariant from 'tiny-invariant';

import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export type Coordinate = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coordinate;
};

export type PieceType = 'king' | 'pawn';

type PieceProps = {
  image: StaticImageData;
  alt: string;
};

export function isEqualCoordinate(c1: Coordinate, c2: Coordinate): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export const pieceLookup: { king: () => EmotionJSX.Element; pawn: () => EmotionJSX.Element } = {
  king: () => <King/>,
  pawn: () => <Pawn/>,
};

function renderSquares(pieces: PieceRecord[]) {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coordinate = [row, col];

      const piece = pieces.find((piece) => isEqualCoordinate(piece.location, squareCoord));

      const isDark = (row + col) % 2 === 1;

      squares.push(
        <div css={squareStyles} style={{backgroundColor: isDark ? 'lightgrey' : 'white'}}>
          {piece && pieceLookup[piece.type]()}
        </div>,
      );
    }
  }
  return squares;
}

function Chessboard() {
  const pieces: PieceRecord[] = [
    {type: 'king', location: [3, 2]},
    {type: 'pawn', location: [1, 6]},
  ];

  return <div css={chessboardStyles}>{renderSquares(pieces)}</div>;
}

// 渲染棋子
function Piece({image, alt}: PieceProps) {

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
    });
  }, []);

  // next/image
  return <Image ref={ref} css={imageStyles} src={image} alt={alt} draggable="false"/>; // draggable set to false to prevent dragging of the images
}

export function King() {
  return <Piece image={king as StaticImageData} alt="King"/>;
}

export function Pawn() {
  return <Piece image={pawn as StaticImageData} alt="Pawn"/>;
}

const chessboardStyles = css({
  display:             'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows:    'repeat(8, 1fr)',
  width:               '500px',
  height:              '500px',
  border:              '3px solid lightgrey',
});

const squareStyles = css({
  width:          '100%',
  height:         '100%',
  display:        'flex',
  justifyContent: 'center',
  alignItems:     'center',
});

const imageStyles = css({
  width:        45,
  height:       45,
  padding:      4,
  borderRadius: 6,
  boxShadow:    '1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)',
  '&:hover':    {
    backgroundColor: 'rgba(168, 168, 168, 0.25)',
  },
});

export default Chessboard;