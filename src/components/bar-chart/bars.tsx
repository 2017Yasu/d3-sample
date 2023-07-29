import { BottomScaleType } from './axis-bottom';
import { LeftScaleType } from './axis-left';
import { DataType } from './bar-chart';

type Props = {
  data: DataType[];
  height: number;
  scaleX: BottomScaleType;
  scaleY: LeftScaleType;
};

export default function Bars({ data, height, scaleX, scaleY }: Props) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill='teal'
        />
      ))}
    </>
  );
}
