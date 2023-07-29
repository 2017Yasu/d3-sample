'use client';

import { ChartBaseProps } from '@/types/chart';
import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import AxisBottom from './axis-bottom';

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

  useEffect(() => {
    setScaleX(() =>
      d3
        .scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width]),
    );
  }, [data, width]);

  return (
    <svg
      width={width + marginLeft + marginRight}
      height={height + marginTop + marginBottom}
    >
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {scaleX && (
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        )}
      </g>
    </svg>
  );
}
