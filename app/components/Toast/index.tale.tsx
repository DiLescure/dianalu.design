import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import eventService from '@/services/event';

import { wait } from '@/util';
import ToastTale from './index.tale.mdx';

interface ToastState {
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
}

const tale: TaleContent<ToastState> = {
  taleComponent: ({ taleState }) => {
    const handleAddToast = () => {
      eventService.emit('overlay:request-toast-queue-add', {
        message: taleState.message,
        level: taleState.level,
      });
    };

    const handleAddMultipleToasts = async () => {
      eventService.emit('overlay:request-toast-queue-add', {
        message: 'This is an info toast',
        level: 'info',
      });

      await wait(100);

      eventService.emit('overlay:request-toast-queue-add', {
        message: 'This is a success toast',
        level: 'success',
      });

      await wait(100);

      eventService.emit('overlay:request-toast-queue-add', {
        message: 'This is a warning toast',
        level: 'warning',
      });

      await wait(100);

      eventService.emit('overlay:request-toast-queue-add', {
        message: 'This is an error toast',
        level: 'error',
      });
    };

    const handleBigContentToast = () => {
      eventService.emit('overlay:request-toast-queue-add', {
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        level: 'info',
      });
    };

    return (
      <ToastTale
        handleAddMultipleToasts={handleAddMultipleToasts}
        handleAddToast={handleAddToast}
        handleBigContentToast={handleBigContentToast}
        taleState={taleState}
      />
    );
  },
  schema: z.object({
    message: z.string().min(1, 'Message is required'),
    level: z.enum(['info', 'success', 'warning', 'error']),
  }),
  defaultValues: {
    message: 'Hello, world!',
    level: 'info',
  },
};

export default tale;
