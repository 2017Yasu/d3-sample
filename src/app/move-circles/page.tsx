import dynamic from 'next/dynamic';

const MoveCirclesComponent =
  typeof window === undefined
    ? undefined
    : dynamic(() => import('@/components/move-circles'), { ssr: false });

export default function MoveCirclesPage() {
  return (
    <div>
      {MoveCirclesComponent && <MoveCirclesComponent count={20} radius={20} />}
    </div>
  );
}
