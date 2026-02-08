import type { FC } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

import Button from '@/components/Button';
import Icon, { type IconName } from '@/components/Icon';
import { TOAST_DISMISS_TIME } from '@/config';
import { useToastQueue } from '@/services/overlay';
import Countdown from '@/util/countdown';
import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface ToastProps {
  id?: string;
  className?: string;
  level?: 'info' | 'success' | 'warning' | 'error';
  message: string;
  noCountdown?: boolean;
}

let countdown: Countdown | null = null;

const Toast: FC<ToastProps> = memo(({ className, message, id, level = 'info', noCountdown }) => {
  const { toastQueue, toastQueueNext } = noCountdown
    ? { toastQueue: null, toastQueueNext: () => {} }
    : // biome-ignore lint/correctness/useHookAtTopLevel: breaks if not done this way
      useToastQueue();

  const toastQueueLength = toastQueue?.length || 0;

  const [countdownPercent, setCountdownPercent] = useState<number>(0);

  useEffect(() => {
    if (!countdown && !noCountdown) {
      countdown = new Countdown(
        TOAST_DISMISS_TIME,
        () => {},
        () => {},
      );
    }

    if (countdown) {
      countdown.onTick = (remainingPercent) => {
        setCountdownPercent(remainingPercent);
      };

      countdown.onEnd = () => {
        toastQueueNext();
      };

      countdown.restart();
    }
  }, [id, toastQueueNext]);

  const handleMouseEnter = useCallback(() => {
    if (countdown && !noCountdown) {
      countdown.stop();
      setCountdownPercent(100);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (countdown && !noCountdown) {
      countdown.restart();
    }
  }, []);

  let alertLevelClass: string;
  let alertBorderClass: string;

  // Always use complete class names so tailwind interpolation works
  // https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
  switch (level) {
    case 'info':
      alertLevelClass = 'alert-info';
      alertBorderClass = 'border-info';
      break;
    case 'success':
      alertLevelClass = 'alert-success';
      alertBorderClass = 'border-success';
      break;
    case 'warning':
      alertLevelClass = 'alert-warning';
      alertBorderClass = 'border-warning';
      break;
    case 'error':
      alertLevelClass = 'alert-error';
      alertBorderClass = 'border-error';
      break;
  }

  return (
    /* biome-ignore lint/a11y/noStaticElementInteractions: toast component */
    <div
      className={parseClassName('toast-component toast toast-end', className)}
      onPointerDown={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`alert ${alertBorderClass}`}>
        <div className="flex w-full items-center justify-end">
          {toastQueueLength > 0 && (
            <em className="flex-1 text-sm mr-4">Remaining messages {toastQueueLength}&nbsp;</em>
          )}
          <Button onPress={toastQueueNext} className="btn-link">
            {toastQueueLength > 0 ? 'next' : 'close'}
          </Button>
        </div>
      </div>
      <div className={`alert ${alertLevelClass} animated`}>
        <div className="w-full h-1 absolute top-0 left-0">
          <div
            className="countdown-bar h-1"
            style={{ width: `${Math.min(100, countdownPercent)}%` }}
          />
        </div>
        <div className="w-full">
          <div className="flex w-full text-lg max-h-[50vh] lg:max-w-[50vw] overflow-auto">
            <Icon name={level as IconName} className="w-8 h-8" />
            <span className="ml-2">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Toast;
