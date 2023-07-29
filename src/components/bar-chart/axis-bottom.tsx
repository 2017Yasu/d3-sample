import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export type BottomScaleType = d3.ScaleBand<string>;

type Props = {
  scale: BottomScaleType;
  transform: string;
};

export default function AxisBottom({ scale, transform }: Props) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}
