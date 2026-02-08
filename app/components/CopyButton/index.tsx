import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Button, { type ButtonProps } from '@/components/Button';
import copyToClipboard from '@/util/copy-to-clipboard';
import { parseClassName } from '@/util/parse-class-name';

export interface CopyButtonProps extends Omit<ButtonProps, 'onPress'> {
  value: string;
}

// Duration to show checkmark icon (in milliseconds)
const CHECKMARK_DISPLAY_TIME = 2000;

const CopyButton: FC<CopyButtonProps> = ({ value, className, iconName, ...rest }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideConfirmation = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyClick = useCallback(async () => {
    try {
      const success = await copyToClipboard(value);

      if (success) {
        // Clear any existing timeout before setting a new one
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        setShowConfirmation(true);

        // Set new timeout to hide confirmation
        timeoutRef.current = setTimeout(() => {
          hideConfirmation();
          timeoutRef.current = null;
        }, CHECKMARK_DISPLAY_TIME);
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    }
  }, [value, hideConfirmation]);

  const finalClassName = parseClassName(
    'copy-button',
    className,
    showConfirmation ? 'tooltip tooltip-bottom tooltip-open' : 'tooltip tooltip-bottom',
  );

  const dataTip = showConfirmation ? 'Copied!' : 'Copy to clipboard';

  const finalIconName = showConfirmation ? 'checkmark' : iconName || 'clipboard';

  return (
    <Button
      {...rest}
      iconName={finalIconName}
      onPress={handleCopyClick}
      className={finalClassName}
      data-tip={dataTip}
      aria-label={dataTip}
      data-value={value}
    />
  );
};

export default CopyButton;
