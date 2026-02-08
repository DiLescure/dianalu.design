// biome-ignore-all lint/correctness/useHookAtTopLevel: Hooks used conditionally to avoid running on server
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { handleVisibilityChange } from '@/util';

export interface AnchorNavigationProviderProps {
  children: ReactNode;
}

/**
 * Get hash from URL (without the # symbol) - client-safe
 */
const getUrlHash = (): string => {
  if (typeof window === 'undefined') return '';
  return window.location.hash.substring(1);
};

/**
 * Find the closest parent element that is scrollable
 */
const findScrollableParent = (element: HTMLElement): HTMLElement => {
  if (!element) return document.documentElement;

  // Start with the parent element
  let parent = element.parentElement;

  // Traverse up the DOM tree until we find a scrollable parent or reach the document
  while (parent && parent !== document.documentElement) {
    const styles = window.getComputedStyle(parent);
    const overflowY = styles.getPropertyValue('overflow-y');

    // Check if this element has scrollable overflow
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent;
    }

    parent = parent.parentElement;
  }

  // If no scrollable parent found, use the document element
  return document.documentElement;
};

const scrollMarginFirefoxFix = () => {
  if (typeof window === 'undefined') return;

  const root = (window as any).root;
  if (!root) return;

  if (document.getElementById('noScrollFix')) {
    return;
  }

  const firstChild = root.children[0] as HTMLElement;

  if (firstChild && firstChild.getBoundingClientRect().y < 0) {
    // get firstChild's current margin-top and remove px
    const marginTop = firstChild.style.getPropertyValue('margin-top').replace(/\D/, '') || '0';
    firstChild.style.setProperty(
      'margin-top',
      `${Number.parseFloat(marginTop) + firstChild.getBoundingClientRect().y * -1}px`,
    );
  }
};

/**
 * Scroll the element into view within its scrollable parent
 */
const scrollElementIntoView = (element: HTMLElement) => {
  if (!element) return;

  // Find the scrollable parent
  const scrollableParent = findScrollableParent(element);

  // Calculate the scroll position
  const elementRect = element.getBoundingClientRect();
  const parentRect = scrollableParent.getBoundingClientRect();

  // Calculate the relative position of the element within the parent
  const relativeTop = elementRect.top - parentRect.top;

  // Calculate the ideal scroll position (with a small offset to improve visibility)
  const offset = 24; // Pixel offset from the top of the container
  const targetScroll = scrollableParent.scrollTop + relativeTop - offset;

  // Perform the scroll with smooth behavior
  scrollableParent.scrollTo({
    top: targetScroll,
    behavior: 'smooth',
  });

  scrollMarginFirefoxFix();
};

export const AnchorNavigationProvider: React.FC<AnchorNavigationProviderProps> = ({ children }) => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // Initialize state from URL
  const [currentAnchor, setCurrentAnchor] = useState<string>(getUrlHash());
  const isInitialMount = useRef(true);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Update anchor state when URL changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentAnchor(getUrlHash());
    };

    scrollMarginFirefoxFix();

    // Djank AF but after thoroughly testing every other solution, this is the only one that works
    setTimeout(() => {
      scrollMarginFirefoxFix();
    }, 1000);

    // Listen for history changes (back/forward buttons) and hash changes
    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('popstate', scrollMarginFirefoxFix);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange(scrollMarginFirefoxFix),
      false,
    );

    // Override the pushState and replaceState methods to detect URL changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args: any[]) {
      const finalArgs = (args.length < 2 ? [args[0], ''] : args) as [any, any, any | undefined];

      originalPushState.apply(this, finalArgs);
      // After pushState, check if the hash has changed
      handleHashChange();
    };

    window.history.replaceState = function (...args: any[]) {
      const finalArgs = (args.length < 2 ? [args[0], ''] : args) as [any, any, any | undefined];

      originalReplaceState.apply(this, finalArgs);
      // After replaceState, check if the hash has changed
      handleHashChange();
    };

    // Initialize from URL on mount
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // Only set initial anchor if it exists in the URL
      const initialHash = getUrlHash();
      if (initialHash) {
        setCurrentAnchor(initialHash);
      }
    }

    return () => {
      // Restore original methods
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;

      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('popstate', scrollMarginFirefoxFix);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange(scrollMarginFirefoxFix),
        false,
      );

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // When currentAnchor changes, scroll to the element
  useEffect(() => {
    if (currentAnchor) {
      // Clear any existing timeout
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // Set a new timeout to ensure DOM is ready
      // Use longer timeout for initial mount to ensure content is fully rendered
      const timeout = isInitialMount.current ? 500 : 100;

      const attemptScroll = (retryCount = 0) => {
        const targetElement = document.getElementById(currentAnchor);
        if (targetElement) {
          // Use our custom scroll function instead of scrollIntoView
          scrollElementIntoView(targetElement);

          // Mark initial mount as complete after first successful scroll
          if (isInitialMount.current) {
            isInitialMount.current = false;
          }
        } else if (retryCount < 3 && isInitialMount.current) {
          // Retry a few times for initial mount if element not found
          setTimeout(() => attemptScroll(retryCount + 1), 250);
        }
      };

      scrollTimeoutRef.current = window.setTimeout(() => {
        attemptScroll();
        scrollTimeoutRef.current = null;
      }, timeout);
    }
  }, [currentAnchor]);

  return <>{children}</>;
};
