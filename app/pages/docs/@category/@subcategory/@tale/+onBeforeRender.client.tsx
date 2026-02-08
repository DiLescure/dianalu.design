import type { PageContextClient } from 'vike/types';

import tales from '@/pages/docs/tales';

import type { Data } from './+data';

export const onBeforeRender = async (pageContext: PageContextClient) => {
  const { data } = pageContext;
  const { talePath } = data as Data;
  // console.log('talePath', talePath);
  const { taleComponent, defaultValues, schema } = tales[talePath];

  return {
    pageContext: {
      taleComponent,
      defaultValues,
      schema,
    },
  };
};
