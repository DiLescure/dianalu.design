import type { PageContext } from 'vike/types';

import { AVAILABLE_LOCALES } from '@/config';
import { extractLocale } from '@/util/extract-locale';
import { getUserPreferredLocale } from '@/util/get-user-preferred-locale';

export const onCreatePageContext = (pageContext: PageContext) => {
  const { locale } = extractLocale(window.location);

  // console.log('onCreatePageContext', pageContext.urlParsed, locale);

  if (!AVAILABLE_LOCALES.includes(locale)) {
    window.location.href = `/${getUserPreferredLocale()}${pageContext.urlParsed.pathname}`;
  }

  pageContext.locale = locale;
};
