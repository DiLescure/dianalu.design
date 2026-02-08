import { useEffect, useState } from 'react';
import type { PressEvent } from 'react-aria-components';

import Button, { type ButtonProps } from '@/components/Button';
import eventService from '@/services/event';
import { parseClassName } from '@/util/parse-class-name';

interface ColorSchemeButtonProps extends Omit<ButtonProps, 'children'> {
  children: (themeMode: string) => React.ReactNode | React.ReactNode;
}

const ColorSchemeButton = ({ children, className, onPress, ...props }: ColorSchemeButtonProps) => {
  // Local theme state, updated via events
  const [themeState, setThemeState] = useState({ themeMode: 'light' });

  // Listen for theme updates
  useEffect(() => {
    const handleThemeUpdate = (updatedTheme: any) => {
      setThemeState(updatedTheme);
    };

    eventService.on('theme:updated', handleThemeUpdate);

    eventService.emit('theme:request-update-announce');

    return () => {
      eventService.off('theme:updated', handleThemeUpdate);
    };
  }, []);

  const toggleDarkMode = (event: PressEvent) => {
    // Emit theme toggle event instead of calling hook directly
    eventService.emit('theme:request-mode-toggle');

    onPress?.(event);
  };

  const finalClassName = parseClassName('color-scheme-button-component', className);

  return (
    <Button
      onPress={toggleDarkMode}
      className={finalClassName}
      aria-label={`Switch to ${themeState.themeMode === 'dark' ? 'light' : 'dark'} mode`}
      {...props}
    >
      {children(themeState.themeMode)}
    </Button>
  );
};

export default ColorSchemeButton;
