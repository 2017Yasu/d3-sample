import { ChartBaseProps } from '@/types/chart';

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
  return (
    <svg width={width} height={height}>
      <g transform={`transform(${marginLeft}, ${marginTop})`}></g>
    </svg>
  );
}
