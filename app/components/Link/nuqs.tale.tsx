import { useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import { generateNuqsSearchParams } from '@/util/generate-nuqs-search-params';

import { searchParamsStringToJson } from '@/util/search-params-string-to-json';
import NuqsTale from './nuqs.tale.mdx';

interface TaleContentProps {
  searchParams: Record<string, any>;
}

const tale: TaleContent<TaleContentProps> = {
  taleComponent: ({ taleState }) => {
    const [searchParams, setSearchParams] = useQueryStates(
      generateNuqsSearchParams(taleState.searchParams),
    );

    useEffect(() => {
      setSearchParams(taleState.searchParams);
    }, [taleState]);

    return <NuqsTale {...searchParams} />;
  },
  defaultValues: {
    searchParams: (typeof window !== 'undefined' &&
      window.location.search &&
      searchParamsStringToJson(window.location.search)) || {
      hello: 'world',
      bool: true,
      number: 123,
      float: 123.456,
      array: [1, 2, 3],
      object: { a: 1, b: 2 },
    },
  },
  schema: z.object({
    searchParams: z.any(),
  }),
};

export default tale;
