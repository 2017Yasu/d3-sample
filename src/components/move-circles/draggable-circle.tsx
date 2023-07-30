import * as d3 from 'd3';
import { memo, useCallback, useState } from 'react';

type Props = {
  x: number;
  y: number;
  r: number;
  fill: string;
  onPositionChange(x: number, y: number): void;
};

function Circle(props: Props) {
  const { x, y, r, fill, onPositionChange } = props;

  const [num] = useState(Math.random());

  const initDragEvents = useCallback(
    (selection: d3.Selection<SVGCircleElement, unknown, null, undefined>) => {
      console.log('init drag event', num);
      const handleDragStart = (
        event: d3.D3DragEvent<SVGCircleElement, unknown, null>,
        d: unknown,
      ) => {
        console.log('drag start');
        selection.raise().attr('stroke', 'currentColor');
      };

      const handleDragging = (
        event: d3.D3DragEvent<SVGCircleElement, unknown, null>,
        d: unknown,
      ) => {
        console.log('dragging');
        onPositionChange(event.x, event.y);
      };

      const handleDragEnd = (
        event: d3.D3DragEvent<SVGCircleElement, unknown, null>,
        d: unknown,
      ) => {
        console.log('drag end');
        selection.raise().attr('stroke', null);
      };

      selection.call(
        d3
          .drag<SVGCircleElement, unknown, null>()
          .on('start', handleDragStart)
          .on('drag', handleDragging)
          .on('end', handleDragEnd),
      );
    },
    [onPositionChange],
  );

  const getRef = useCallback(
    (element: SVGCircleElement | null) => {
      if (!element) return;
      d3.select(element).call(initDragEvents);
    },
    [initDragEvents],
  );

  return <circle ref={getRef} cx={x} cy={y} r={r} fill={fill} />;
}

const DraggableCircle = memo(Circle, (prev, next) => {
  return prev.x === next.x && prev.y === next.y;
});
export default DraggableCircle;
