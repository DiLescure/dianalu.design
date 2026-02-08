import cloneDeep from 'lodash.clonedeep';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

import eventService from '@/services/event';

import { ThemeContext, type ThemeState } from './index';

const initialThemeState: ThemeState = {
  themeName: 'default',
  themeMode: 'light',
  // themeMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

type ThemeProviderComponentProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderComponentProps) => {
  const [themeState, setThemeState] = useState<ThemeState>(initialThemeState);

  const updateThemeState = useCallback(
    (newState: Partial<ThemeState>) => {
      const updatedState = cloneDeep({ ...themeState, ...newState });
      localStorage.setItem('themeState', JSON.stringify(updatedState));
      setThemeState(updatedState);

      const themeables = [document.body, window.root];
      const dataThemeValue = `${updatedState.themeName}-${updatedState.themeMode}`;

      for (const themeable of themeables) {
        themeable.removeAttribute('data-theme');
        themeable.setAttribute('data-theme', dataThemeValue);
      }

      eventService.emit('theme:updated', updatedState);
    },
    [themeState.themeName, themeState.themeMode],
  );

  // Event listener for theme mode toggle requests
  useEffect(() => {
    const handleThemeModeToggle = () => {
      updateThemeState({
        themeMode: themeState.themeMode === 'dark' ? 'light' : 'dark',
      });
    };

    eventService.on('theme:request-mode-toggle', handleThemeModeToggle);

    return () => {
      eventService.off('theme:request-mode-toggle', handleThemeModeToggle);
    };
  }, [themeState.themeMode, themeState.themeName]);

  // Event listener for theme name update requests
  useEffect(() => {
    const handleThemeNameUpdate = (themeName: string) => {
      updateThemeState({
        themeName: themeName,
      });
    };

    eventService.on('theme:request-update', handleThemeNameUpdate);

    return () => {
      eventService.off('theme:request-update', handleThemeNameUpdate);
    };
  }, [themeState.themeName, themeState.themeMode]);

  const handleThemeStateUpdate = useCallback(() => {
    eventService.emit('theme:updated', themeState);
  }, [themeState.themeName, themeState.themeMode]);

  useEffect(() => {
    const storedThemeState = localStorage.getItem('themeState');
    if (storedThemeState) {
      const parsedThemeState = JSON.parse(storedThemeState);
      updateThemeState(parsedThemeState);
    } else {
      updateThemeState(initialThemeState);
    }

    eventService.on('theme:request-update-announce', handleThemeStateUpdate);

    return () => {
      eventService.off('theme:request-update-announce', handleThemeStateUpdate);
    };
  }, [handleThemeStateUpdate]);

  return (
    <ThemeContext
      value={{
        themeState,
        updateThemeState,
      }}
    >
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
