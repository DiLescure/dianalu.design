import { DEFAULT_LOCALE } from '@/config';
import { runQuery } from '@/services/api';
import { createCommonErrorHandler } from '@/util';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const commonErrorHandler = createCommonErrorHandler(DEFAULT_LOCALE);
  const {HomePageContent} = await runQuery({query: 'HomePageContent', commonErrorHandler});
  const {tagline} = HomePageContent;

  // Return data for client-side redirect
  return {
    tagline,
  };
};
