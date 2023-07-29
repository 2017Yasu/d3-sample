'use client';

import * as d3 from 'd3';
import { useEffect, useState } from 'react';
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
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, radius, width]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
    >
      {circles &&
        circles.map(({ x, y }, i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={radius}
            fill={d3.schemeCategory10[i % 10]}
          />
        ))}
    </svg>
  );
}
