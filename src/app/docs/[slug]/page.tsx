import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/lib/mdx';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { DocContent } from '@/components/ui/DocContent';

export const dynamicParams = true;

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export interface DocPageProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocBySlug(params.slug);
  
  if (!doc) {
    notFound();
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Documentation
        </Link>
      </div>
      
      <DocContent>
        {doc.content}
      </DocContent>
    </div>
  );
} 