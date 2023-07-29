import { ChartBaseProps } from '@/types/chart';
import * as d3 from 'd3';
import { useState } from 'react';
import AxisBottom from './axis-bottom';

type DataType = {
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
  const [scaleX] = useState<d3.ScaleBand<string>>(
    d3
      .scaleBand()
      .domain(data.map(({ label }) => label))
      .range([0, width]),
  );
  return (
    <svg width={width} height={height}>
      <g transform={`transform(${marginLeft}, ${marginTop})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
      </g>
    </svg>
  );
}
