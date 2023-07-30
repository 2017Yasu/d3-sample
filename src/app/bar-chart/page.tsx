import dynamic from 'next/dynamic';

import { type DataType } from '@/components/bar-chart';

const BarChartComponent =
  typeof window === undefined
    ? undefined
    : dynamic(() => import('@/components/bar-chart'), { ssr: false });

export default function BarChartPage() {
  const data: DataType[] = [
    { label: 'Apples', value: 100 },
    { label: 'Bananas', value: 200 },
    { label: 'Oranges', value: 50 },
    { label: 'Kiwis', value: 150 },
  ];

  return <div>{BarChartComponent && <BarChartComponent data={data} />}</div>;
}
