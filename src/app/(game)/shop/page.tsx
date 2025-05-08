import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop | CADemy",
  description: "Get skins, effects, and more using coins earned in educational games!",
};

// Lightweight loading state
function ShopLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center justify-center">
      <div className="text-white text-lg">Loading Shop...</div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopClient />
    </Suspense>
  );
} 