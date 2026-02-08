import type { PageContextClient } from 'vike/types';
import { extractLocale } from '@/util/extract-locale';

export const onBeforeRoute = (pageContext: PageContextClient) => {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlParsed);

  // console.log('onBeforeRoute', pageContext.urlOriginal, {urlWithoutLocale, locale});

  if (!locale) {
    // No locale found in URL, do nothing
    return { pageContext: { urlLogical: pageContext.urlParsed } };
  }

  return {
    pageContext: {
      // Make locale available as pageContext.locale
      locale,
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal and
      // the locale is removed from pageContext.urlParsed
      urlLogical: urlWithoutLocale,
    },
  };
};
