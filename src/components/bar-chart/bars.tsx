import { useCallback, useEffect, useState } from 'react';

import { BottomScaleType } from './axis-bottom';
import { LeftScaleType } from './axis-left';
import { DataType } from './bar-chart';

type Props = {
  data: DataType[];
  height: number;
  scaleX: BottomScaleType;
  scaleY: LeftScaleType;
  barScale?: number;
};

export default function Bars({
  data,
  height,
  scaleX,
  scaleY,
  barScale = 1,
}: Props) {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    setWidth(scaleX.bandwidth() * barScale);
  }, [barScale, scaleX]);

  const getX = useCallback(
    (label: string) => {
      const boundX = scaleX(label);
      const bandwidth = scaleX.bandwidth();
      if (boundX === undefined) return undefined;
      return boundX + (bandwidth - width) / 2;
    },
    [scaleX, width],
  );

  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={getX(label)}
          y={scaleY(value)}
          width={width}
          height={height - scaleY(value)}
          fill='teal'
        />
      ))}
    </>
  );
}
