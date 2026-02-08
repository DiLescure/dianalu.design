import { NuqsAdapter } from 'nuqs/adapters/react';
import React from 'react';
import { clientOnly } from 'vike-react/clientOnly';
import { usePageContext } from 'vike-react/usePageContext';

// It's important that this is imported first,
// otherwise layout/component styles will be overridden
import '@/global.css';

import OverlayLayout from '@/layouts/OverlayLayout';
import { OverlayProvider } from '@/services/overlay';
import { composeProviders } from '@/util/compose-providers';

const StateProvider = clientOnly(() => import('@/services/state/index.client'));
const ThemeProvider = clientOnly(() => import('@/services/theme/index.client'));
const AnchorNavigationProvider = clientOnly(() =>
  import('@/services/anchor-navigation').then((m) => ({ default: m.AnchorNavigationProvider })),
);

const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  const pageContext = usePageContext();

  const { config } = pageContext;

  const initialStoredPageState = config.initialStoredPageState || {};
  const initialVirtualPageState = config.initialVirtualPageState || {};

  const OverlayContent = () => (
    <OverlayProvider>
      <OverlayLayout />
    </OverlayProvider>
  );

  const Providers = composeProviders(ThemeProvider, AnchorNavigationProvider, NuqsAdapter);

  return (
    <React.StrictMode>
      <StateProvider
        initialStoredPageState={initialStoredPageState}
        initialVirtualPageState={initialVirtualPageState}
      >
        <Providers>
          {children}
          <OverlayContent />
        </Providers>
      </StateProvider>
    </React.StrictMode>
  );
};

export default LayoutDefault;
