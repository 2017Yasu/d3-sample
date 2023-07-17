'use client';

import { useCallback, useState, MouseEvent } from 'react';
import * as d3 from 'd3';
import LinePlot from '../line-plot';

export default function TrackingLine() {
  const [numDataPoints] = useState(200);
  const [data, setData] = useState(() => {
    const rand = d3.randomUniform();
    const values = [];
    for (let i = 0; i < numDataPoints; i++) {
      values.push(rand());
    }
    return values;
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const [x, y] = d3.pointer(e);
      setData((d) => {
        return d.slice(-1 * numDataPoints).concat(Math.atan2(y, x));
      });
    },
    [numDataPoints],
  );

  return (
    <div className='bg-green-800' onMouseMove={(e) => handleMouseMove(e)}>
      <LinePlot data={data} />
    </div>
  );
}
