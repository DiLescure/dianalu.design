import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import eventService from '@/services/event';

import LoadingOverlayTale from './index.tale.mdx';

const tale: TaleContent = {
  taleComponent: ({ taleState }) => {
    const showLoadingOverlay = () => {
      eventService.emit('overlay:request-set-app-loading', true);

      setTimeout(() => {
        eventService.emit('overlay:request-set-app-loading', false);
      }, taleState.loadingDuration);
    };

    return <LoadingOverlayTale showLoadingOverlay={showLoadingOverlay} />;
  },
  defaultValues: {
    loadingDuration: 1000,
  },
  schema: z.object({
    loadingDuration: z.number().min(10).max(100000),
  }),
};

export default tale;
