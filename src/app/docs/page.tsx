import { getAllDocs } from '@/lib/mdx';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function DocsPage() {
  const docs = await getAllDocs();
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Documentation Home
        </Link>
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Game design documentation and specifications
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc) => (
          <div key={doc.slug} className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-2 truncate">{doc.title}</h2>
            <Link 
              href={`/docs/${doc.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View Document →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 