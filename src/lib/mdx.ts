'use server';
import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import type { Pluggable } from 'unified';

// Fix the spacing in the Markdown content
function formatMarkdown(content: string): string {
  // Replace hyphens at the beginning of a line (making sure they're list items)
  // with proper list items that will be recognized correctly
  let formatted = content.replace(/^(\s*)-\s+(.+)$/gm, '$1- $2');
  
  // Add double line breaks after headings
  formatted = formatted.replace(/^(#{1,6}.*?)$/gm, '$1\n');
  
  // Ensure paragraphs have line breaks between them
  formatted = formatted.replace(/^([^\n#-].+)$/gm, '$1\n');
  
  return formatted;
}

export async function getDocBySlug(slug: string) {
  const docsDirectory = path.join(process.cwd(), '../docs');
  const filePath = path.join(docsDirectory, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const formattedContent = formatMarkdown(fileContents);
    
    const { content, frontmatter } = await compileMDX({
      source: formattedContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeHighlight as Pluggable],
          remarkPlugins: [remarkGfm],
        },
      },
    });
    
    return {
      content,
      frontmatter,
      slug,
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

export async function getAllDocs() {
  const docsDirectory = path.join(process.cwd(), '../docs');
  
  try {
    const filenames = fs.readdirSync(docsDirectory);
    
    const docs = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        const filePath = path.join(docsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Extract title from the content
        const titleMatch = fileContents.match(/^#\s+(.*)$/m);
        const title = titleMatch ? titleMatch[1] : slug;
        
        return {
          slug,
          title,
        };
      });
    
    return docs;
  } catch (error) {
    console.error(`Error reading docs directory:`, error);
    return [];
  }
} 