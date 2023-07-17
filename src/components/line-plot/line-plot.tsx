'use client';

import * as d3 from 'd3';
import { useEffect, useState } from 'react';

type Props = {
  data: number[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export default function LinePlot(props: Props) {
  const {
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
  } = props;

  const [lineData, setLineData] = useState<string | null>(null);
  const [scaleX, setScaleX] = useState<d3.ScaleLinear<number, number>>();
  const [scaleY, setScaleY] = useState<d3.ScaleLinear<number, number>>();

  useEffect(() => {
    const x = d3.scaleLinear(
      [0, data.length],
      [marginLeft, width - marginRight],
    );
    const [y_min, y_max] = d3.extent(data);
    if (!y_min || !y_max) return;
    const y = d3.scaleLinear(
      [y_min, y_max],
      [height - marginBottom, marginTop],
    );
    const line = d3.line((d, i) => {
      return x(i);
    }, y);
    setLineData(() => line(data));
    setScaleX(() => x);
    setScaleY(() => y);
  }, [data, height, marginBottom, marginLeft, marginRight, marginTop, width]);

  return (
    <svg width={width} height={height}>
      {lineData && (
        <path
          fill='none'
          stroke='currentColor'
          strokeWidth={1.5}
          d={lineData}
        />
      )}
      <g fill='white' stroke='currentColor' strokeWidth={1.5}>
        {scaleX &&
          scaleY &&
          data.map((d, i) => (
            <circle key={i} cx={scaleX(i)} cy={scaleY(d)} r={2.5} />
          ))}
      </g>
    </svg>
  );
}