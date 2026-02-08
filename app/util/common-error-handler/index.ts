import { baseUrl, loginUrl } from '@/config';

export const createCommonErrorHandler =
  (locale: string) => (error: any, shouldLogout?: boolean) => {
    const hasGraphQlErrors = error.graphQLErrors && error.graphQLErrors.length > 0;

    if (shouldLogout && hasGraphQlErrors && error.graphQLErrors[0].extensions?.statusCode === 403) {
      const goBackBaseUrl = baseUrl.replace(/^(https:|http:)/, '');
      const goBackPath = window.location.pathname;
      const goBackSearch = encodeURIComponent(window.location.search);
      const redirectUrl = `/${locale}${loginUrl}?goback=/${goBackBaseUrl}${goBackPath}${goBackSearch}`;
      console.log(redirectUrl);
      window.location.href = redirectUrl;
    }

    if (hasGraphQlErrors) {
      console.log(error);
    }

    return error;
  };
