import type { PageContextClient, PageContextServer } from 'vike/types';

export const route = (pageContext: PageContextServer | PageContextClient) => {
  if (!pageContext.urlPathname.includes('api-service')) {
    return false;
  }

  return {
    match: pageContext.urlPathname === '/docs/services/api-service/',
    precedence: 1,
  };
};
