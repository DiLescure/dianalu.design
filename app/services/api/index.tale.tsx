import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import { useApi } from '@/services/api';

import ApiServiceTale from './index.tale.mdx';

const tale: TaleContent = {
  taleComponent: () => {
    const { queries } = useApi() || {};

    const fallbackQuery = { queryKey: ['DocsMockDatum'], queryFn: async () => null };
    const queryConfig = queries ? queries.DocsMockDatum() : fallbackQuery;

    const { isPending, isFetching, error, data, refetch } = useQuery({
      ...queryConfig,
      enabled: false,
    });

    return (
      <ApiServiceTale
        data={data}
        onRun={() => {
          void refetch();
        }}
        isPending={isPending}
        isFetching={isFetching}
        error={error as any}
      />
    );
  },
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
