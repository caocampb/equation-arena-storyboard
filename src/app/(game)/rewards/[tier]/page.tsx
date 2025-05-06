import { Suspense } from 'react';
import TierDetailClient from '@/app/(game)/rewards/[tier]/TierDetailClient';

// Loading fallback component
function TierDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      <div className="animate-pulse w-full h-screen flex flex-col space-y-6 p-4">
        <div className="h-20 bg-gray-700/30 rounded w-full"></div>
        <div className="h-8 bg-gray-700/30 rounded w-3/4"></div>
        <div className="h-2 bg-gray-700/30 rounded-full w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="h-64 bg-gray-700/30 rounded"></div>
          <div className="h-64 bg-gray-700/30 rounded"></div>
        </div>
        <div className="h-40 bg-gray-700/30 rounded w-full"></div>
      </div>
    </div>
  );
}

// Type for params
interface TierDetailPageProps {
  params: {
    tier: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

// Static params generation for build optimization
export function generateStaticParams() {
  // Pre-generate routes for tiers 1-10
  return Array.from({ length: 10 }, (_, i) => ({
    tier: (i + 1).toString(),
  }));
}

export default function TierDetailPage({ params }: TierDetailPageProps) {
  // Use a Suspense boundary to handle the async data and prevent hydration issues
  return (
    <div className="min-h-screen bg-[#0A1930] pb-16">
      <Suspense fallback={<TierDetailSkeleton />}>
        <TierDetailClient tier={params.tier} />
      </Suspense>
    </div>
  );
} 