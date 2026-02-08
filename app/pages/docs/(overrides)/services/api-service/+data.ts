import type { PageContextServer } from 'vike/types';

import { type Data as TaleData, data as taleData } from '@/pages/docs/@category/@tale/+data';

export type Data = TaleData;

export const data = async (pageContext: PageContextServer) => {
  return taleData({
    ...pageContext,
    routeParams: {
      ...pageContext.routeParams,
      category: 'services',
      tale: 'api-service',
    },
  });
};
