import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '@/config';

export const getUserPreferredLocale = () => {
  let navigatorLocale = '';

  // Try to get from navigator.languages (most accurate)
  if (navigator.languages?.length) {
    navigatorLocale = navigator.languages[0];

    if (AVAILABLE_LOCALES.includes(navigatorLocale)) {
      return navigatorLocale;
    }
  }

  // Fallback to other navigator properties
  navigatorLocale =
    navigator.language ||
    // @ts-ignore
    navigator.browserLanguage ||
    // @ts-ignore
    navigator.systemLanguage ||
    // @ts-ignore
    navigator.userLanguage;

  if (AVAILABLE_LOCALES.includes(navigatorLocale)) {
    return navigatorLocale;
  }

  return DEFAULT_LOCALE;
};
