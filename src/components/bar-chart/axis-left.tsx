import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export type LeftScaleType = d3.ScaleLinear<number, number>;

type Props = {
  scale: LeftScaleType;
};

export default function AxisLeft({ scale }: Props) {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}
