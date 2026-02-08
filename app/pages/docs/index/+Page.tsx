import { useEffect } from 'react';
import { navigate } from 'vike/client/router';
import { useData } from 'vike-react/useData';

import Link from '@/components/Link';

import type { Data } from './+data';

export default function Page() {
  const { defaultTaleUrl } = useData<Data>();

  useEffect(() => {
    // Perform client-side redirect to the default tale
    if (typeof window !== 'undefined') {
      navigate(defaultTaleUrl);
    }
  }, [defaultTaleUrl]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Taleforge</h1>
        <p className="text-base-content/70 mb-4">Redirecting to default tale...</p>
        <div className="loading loading-spinner loading-lg" />

        {/* Fallback for users who have JavaScript disabled */}
        <noscript>
          <div className="mt-8 p-4 border border-base-300 rounded">
            <p className="mb-4">JavaScript is required for automatic redirection.</p>
            <Link to={defaultTaleUrl} className="link link-primary">
              {defaultTaleUrl}
            </Link>
          </div>
        </noscript>
      </div>
    </div>
  );
}
