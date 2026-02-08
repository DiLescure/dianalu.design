import { parseAsBoolean, parseAsJson, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import LinkTale from './index.tale.mdx';

interface LinkTaleState {
  to: string;
  children: string;
  external: boolean;
  className: string;
  rel: string;
  searchParams: Record<string, any>;
}

let initialTo = '#';

if (typeof window !== 'undefined') {
  initialTo = window.location.pathname;
}

const tale: TaleContent<LinkTaleState> = {
  taleComponent: ({
    taleState,
    // taleOnChange,
  }) => {
    const [to, setTo] = useQueryState('to');
    const [children, setChildren] = useQueryState('children');
    const [external, setExternal] = useQueryState('external', parseAsBoolean);
    const [className, setClassName] = useQueryState('className');
    const [rel, setRel] = useQueryState('rel');
    const [searchParams, setSearchParams] = useQueryState(
      'searchParams',
      parseAsJson((v: any) => v),
    );

    useEffect(() => {
      setTo(taleState.to);
      setChildren(taleState.children);
      setExternal(taleState.external);
      setClassName(taleState.className);
      setRel(taleState.rel);
      setSearchParams(taleState.searchParams);
    }, [taleState]);

    const linkProps = {
      to,
      children,
      external,
      className,
      rel,
      searchParams,
    };

    return <LinkTale {...linkProps} />;
  },
  defaultValues: {
    to: initialTo,
    children: 'Hello World',
    external: false,
    className: '',
    rel: '',
    searchParams: { hello: 'world' },
  },
  schema: z.object({
    to: z.string().min(1, 'To is required'),
    children: z.string().min(1, 'Children is required'),
    external: z.boolean(),
    className: z.string(),
    rel: z.string(),
    searchParams: z.any(),
  }),
};

export default tale;
