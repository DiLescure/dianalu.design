import { modifyUrl } from 'vike/modifyUrl';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@/config';

interface Url {
  pathname: string;
  href: string;
}

export const extractLocale = (url: Url) => {
  // console.log('extractLocale', url);

  const { pathname } = url;

  // Determine the locale, for example:
  //  /en-US/film/42 => en-US
  //  /de-DE/film/42 => de-DE
  const locale = pathname.split('/')[1];

  if (!locale || !AVAILABLE_LOCALES.includes(locale))
    return { locale: DEFAULT_LOCALE, urlWithoutLocale: url.href };

  // Remove the locale, for example:
  //  /en-US/film/42 => /film/42
  //  /de-DE/film/42 => /film/42
  const pathnameWithoutLocale = `/${pathname.split('/').slice(2).join('/')}`;

  // Reconstruct full URL
  const urlWithoutLocale = modifyUrl((url.href || '/').replace(/^([^/])/, '/$1'), {
    pathname: pathnameWithoutLocale,
  });

  return { locale, urlWithoutLocale };
};
