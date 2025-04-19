"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import OriginalPage from "../page";

export default function StoryboardPage() {
  // Re-export the original page with a back button
  
  // Render with the Back to Overworld button
  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/overworld">
          <Button variant="outline" className="bg-white hover:bg-gray-100">
            ← Back to Overworld
          </Button>
        </Link>
      </div>
      
      <OriginalPage />
    </div>
  );
} 