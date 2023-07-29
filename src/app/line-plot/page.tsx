import * as d3 from 'd3';
import dynamic from 'next/dynamic';

const LinePlotComponent =
  typeof window === undefined
    ? undefined
    : dynamic(() => import('@/components/line-plot'), { ssr: false });

export default function LinePlotPage() {
  const data = d3.ticks(-2 * Math.PI, 2 * Math.PI, 200).map((v) => Math.sin(v));

  return <div>{LinePlotComponent && <LinePlotComponent data={data} />}</div>;
}
