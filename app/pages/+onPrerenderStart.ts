import type { PageContextServer } from 'vike/types';

import { AVAILABLE_LOCALES } from '@/config';

const hasLocaleInUrl = (urlOriginal: string) => {
  for (const locale of AVAILABLE_LOCALES) {
    if (urlOriginal.startsWith(`/${locale}/`) || urlOriginal === `/${locale}`) {
      return true;
    }
  }
  return false;
};

export const onPrerenderStart = (prerenderContext: { pageContexts: PageContextServer[] }) => {
  const pageContexts: PageContextServer[] = [];
  const result = {
    prerenderContext: {
      pageContexts,
    },
  };

  for (const pageContext of prerenderContext.pageContexts) {
    // Duplicate pageContext for each locale
    for (const locale of AVAILABLE_LOCALES) {
      // Localize URL
      let { urlOriginal } = pageContext;

      if (!hasLocaleInUrl(urlOriginal)) {
        urlOriginal = `/${locale}${pageContext.urlOriginal}`;
      }

      result.prerenderContext.pageContexts.push({
        ...pageContext,
        urlOriginal,
        locale,
      });
    }
  }

  return result;
};
