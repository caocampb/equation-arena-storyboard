"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EquationArenaPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to storyboard
    router.push("/storyboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading Equation Arena...</p>
    </div>
  );
} 