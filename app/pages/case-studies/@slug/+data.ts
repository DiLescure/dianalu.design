import type { PageContextServer } from 'vike/types';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const { slug } = pageContext.routeParams;
  
  // Use internal Docker network URL for server-side fetch
  const apiBase = process.env.CMS_INTERNAL_URL || 'http://cms:3000';
  
  try {
    const response = await fetch(
      `${apiBase}/api/case-studies?where[slug][equals]=${slug}&limit=1`
    );
    
    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return { caseStudy: null };
    }
    
    const result = await response.json();
    const caseStudy = result?.docs?.[0] || null;
    
    return { caseStudy };
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    return { caseStudy: null };
  }
};
