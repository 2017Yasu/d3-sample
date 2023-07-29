'use client';

import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { ChartBaseProps } from '@/types/chart';

type Props = ChartBaseProps & {
  data: number[];
  showScale?: boolean;
};

export default function LinePlot(props: Props) {
  const {
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    showScale = true,
  } = props;

  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const [lineData, setLineData] = useState<string | null>(null);
  const [scaleX, setScaleX] = useState<d3.ScaleLinear<number, number>>();
  const [scaleY, setScaleY] = useState<d3.ScaleLinear<number, number>>();

  useEffect(() => {
    if (!showScale || !scaleX || !gx.current) return;
    d3.select(gx.current).call(d3.axisBottom(scaleX));
  }, [gx, scaleX, showScale]);
  useEffect(() => {
    if (!showScale || !scaleY || !gy.current) return;
    d3.select(gy.current).call(d3.axisLeft(scaleY));
  }, [gy, scaleY, showScale]);

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
      {showScale && (
        <>
          <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
          <g ref={gy} transform={`translate(${marginLeft},0)`} />
        </>
      )}
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
