'use client';

import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import DraggableCircle from './draggable-circle';
import { type CanvasBaseProps } from '@/types/canvas';

type Circle = {
  x: number;
  y: number;
};

type Props = CanvasBaseProps & {
  count: number;
  radius?: number;
  strokeWidth?: number;
};

export default function MoveCircles({
  count,
  width = 640,
  height = 400,
  radius = 32,
  strokeWidth = 2,
}: Props) {
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    setCircles(
      d3.range(count).map((i) => ({
        x: Math.ceil(Math.random() * (width - radius * 2) + radius),
        y: Math.ceil(Math.random() * (height - radius * 2) + radius),
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, radius, width]);

  const handleUpdateCirclePosition = useCallback(
    (i: number, x: number, y: number) => {
      setCircles((old) =>
        old.map((value, index) => (index === i ? { x, y } : value)),
      );
    },
    [],
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
    >
      {circles &&
        circles.map(({ x, y }, i) => (
          <DraggableCircle
            key={i}
            x={x}
            y={y}
            r={radius}
            fill={d3.schemeCategory10[i % 10]}
            onPositionChange={(x, y) => handleUpdateCirclePosition(i, x, y)}
          />
        ))}
    </svg>
  );
}
