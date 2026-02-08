import { createContext, use } from 'react';

export interface ThemeState {
  themeName: string;
  themeMode: 'dark' | 'light';
}

export interface ThemeContextType {
  themeState: ThemeState;
  updateThemeState: (themeState: Partial<ThemeState>) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = use<ThemeContextType | undefined>(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
