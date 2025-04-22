"use client";
import '@/app/docs/docs.css';

export function DocContent({ children }: { children: React.ReactNode }) {
  return (
    <article className="docs-content process-markdown">
      {children}
    </article>
  );
} 