'use client';
import type { CustomComponent } from 'payload';

const GOBACK_URL_LOCAL_STORAGE_KEY = 'cmsGoBackUrl';

/* @ts-ignore */
const GoBackAction: CustomComponent<Record<string, any>> = () => {
  if (typeof window !== 'undefined') {
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (currentUrl.includes('/login') && /(\/http|\/\/\/)/.test(currentUrl)) {
      try {
        let destinationUrl = /(\/http|\/\/\/)(.*)/.exec(currentUrl)?.[2] || '';

        if (destinationUrl) {
          destinationUrl = `//${destinationUrl}`;
          window.localStorage.setItem(GOBACK_URL_LOCAL_STORAGE_KEY, destinationUrl);
          console.log('Saved goBackUrl to window.:', destinationUrl);
        }
      } catch (error) {
        console.error('Failed to save goBackUrl to localStorage:', error);
      }
    }

    setTimeout(() => {
      if (window.location.pathname.includes('/login')) {
        return;
      }

      // On any other route, check if we have a saved URL to go back to
      try {
        const goBackUrl = window.localStorage.getItem(GOBACK_URL_LOCAL_STORAGE_KEY);

        if (goBackUrl) {
          // Clear the saved URL first
          window.localStorage.removeItem(GOBACK_URL_LOCAL_STORAGE_KEY);
          console.log('Redirecting to saved goBackUrl:', goBackUrl);

          const destination = decodeURIComponent(goBackUrl).replace(/([^/])\?/, '$1/?');

          if (destination) {
            window.location.replace(destination);
          }
        }
      } catch (error) {
        console.error('Failed to retrieve or process goBackUrl from localStorage:', error);
      }
    }, 500);
  }

  return null;
};

export default GoBackAction;
