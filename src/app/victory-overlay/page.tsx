import { Suspense } from "react";
import VictoryOverlayClient from "./VictoryOverlayClient";

export default function VictoryOverlayPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">Loading...</div>}>
      <VictoryOverlayClient />
    </Suspense>
  );
} 