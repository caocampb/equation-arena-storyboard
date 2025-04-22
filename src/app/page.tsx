import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-20">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-3">CADemy</h1>
          <p className="text-xl text-muted-foreground">
            Interactive hub world connecting educational mini-games
          </p>
        </header>
        
        <main>
          <h2 className="text-2xl font-semibold mb-6">Game Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <ProjectCard 
              title="Overworld Navigation" 
              description="Map-based navigation between different game worlds and progression visualization."
              href="/overworld"
              badgeText="Mockup"
            />
            
            <ProjectCard 
              title="Math World" 
              description="Specialized level focusing on core mathematical operations and concepts."
              href="/overworld/math-world"
              badgeText="Mockup"
            />
            
            <ProjectCard 
              title="Player Journey" 
              description="End-to-end flow of the player experience from onboarding to mastery."
              href="/storyboard"
              badgeText="Coming Soon"
            />
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Documentation</h2>
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-medium mb-1">Game Design Documents</h3>
                <p className="text-muted-foreground">
                  View our complete collection of design documents, specifications, and planning materials in Notion
                </p>
              </div>
              <a 
                href="https://www.notion.so/df5971f89b3546c6952ed7e857422ebf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shrink-0"
              >
                Open in Notion
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProjectCard({ 
  title, 
  description, 
  href, 
  badgeText 
}: { 
  title: string; 
  description: string; 
  href: string;
  badgeText: string;
}) {
  // Map badge text to appropriate Linear-style colors
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'storyboard':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'mockup':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'coming soon':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const badgeColor = getBadgeColor(badgeText);

  return (
    <div className="group relative bg-card border rounded-lg p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <div className={`text-xs ${badgeColor} px-2 py-0.5 rounded-full border text-[11px] font-medium uppercase tracking-wider`}>
          {badgeText}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <Link 
        href={href}
        className="text-sm text-muted-foreground inline-flex items-center transition-all duration-200 ease-in-out opacity-75 hover:opacity-100 group-hover:translate-x-[1px]"
      >
        View Component
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1.5 h-3 w-3 transition-transform duration-200 ease-in-out group-hover:translate-x-[1px]"
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </Link>
    </div>
  );
}
