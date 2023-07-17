import dynamic from 'next/dynamic';

const TrackingLine =
  typeof window === undefined
    ? undefined
    : dynamic(() => import('@/components/tracking-line'), { ssr: false });

export default function TrackingLinePage() {
  return <div>{TrackingLine && <TrackingLine />}</div>;
}
