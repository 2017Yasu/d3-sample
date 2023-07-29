'use client';

import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import AxisBottom from './axis-bottom';
import AxisLeft from './axis-left';
import Bars from './bars';
import { ChartBaseProps } from '@/types/chart';

export type DataType = {
  label: string;
  value: number;
};

type Props = ChartBaseProps & {
  data: DataType[];
};

export default function BarChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}: Props) {
  const [scaleX, setScaleX] = useState<d3.ScaleBand<string>>();
  const [scaleY, setScaleY] = useState<d3.ScaleLinear<number, number>>();

  useEffect(() => {
    setScaleX(() =>
      d3
        .scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width]),
    );
  }, [data, width]);

  useEffect(() => {
    setScaleY(() =>
      d3
        .scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]),
    );
  }, [data, height]);

  return (
    <svg
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    >
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {scaleX && scaleY && (
          <>
            <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
            <AxisLeft scale={scaleY} />
            <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
          </>
        )}
      </g>
    </svg>
  );
}
