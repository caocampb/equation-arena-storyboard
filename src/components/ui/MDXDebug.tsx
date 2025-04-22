"use client";

export function MDXDebug({ rawContent }: { rawContent: string }) {
  return (
    <div className="bg-gray-100 p-4 rounded-md my-4 text-sm overflow-auto max-h-96">
      <h4 className="text-sm font-bold mb-2">MDX Raw Content Debug:</h4>
      <pre>{rawContent}</pre>
    </div>
  );
} 