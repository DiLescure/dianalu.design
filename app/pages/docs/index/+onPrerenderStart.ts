// https://vike.dev/onPrerenderStart
import type { PageContextServer } from 'vike/types';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@/config';
import { extractLocale } from '@/util/extract-locale';

import { taleCollectionMap } from '../taleCollectionMap';

export const onPrerenderStart = async (prerenderContext: { pageContexts: PageContextServer[] }) => {
  const pageContexts: PageContextServer[] = [];
  const result = {
    prerenderContext: {
      pageContexts,
    },
  };

  if (!prerenderContext?.pageContexts) {
    for (const locale of AVAILABLE_LOCALES) {
      // Generate URLs for all tales in the definition map
      for (const category of taleCollectionMap) {
        // Direct category tales (/@category/@tale/)
        if (category.taleCollection) {
          for (const tale of category.taleCollection) {
            result.prerenderContext.pageContexts.push({
              urlOriginal: `/${locale}/docs/${category.categorySlug}/${tale.slug}/`,
            } as unknown as PageContextServer);
          }
        }

        // Child category tales (/@category/@subcategory/@tale/)
        if (category.childCategories) {
          for (const childCategory of category.childCategories) {
            for (const tale of childCategory.taleCollection) {
              result.prerenderContext.pageContexts.push({
                urlOriginal: `/${locale}/docs/${category.categorySlug}/${childCategory.categorySlug}/${tale.slug}/`,
              } as unknown as PageContextServer);
            }
          }
        }
      }
    }

    return result;
  }

  for (const pageContext of prerenderContext.pageContexts) {
    // Duplicate pageContext for each locale
    for (const locale of AVAILABLE_LOCALES) {
      // Localize URL
      let { urlOriginal } = pageContext;

      if (
        locale !== DEFAULT_LOCALE &&
        !AVAILABLE_LOCALES.includes(extractLocale({ pathname: urlOriginal, href: '' }).locale || '')
      ) {
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
