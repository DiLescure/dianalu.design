import { type ComponentProps, useEffect, useState } from 'react';

import eventService from '@/services/event';
import CopyButton from '../CopyButton';

// Dynamic imports will be loaded only when component renders
type CodeMirrorModule = typeof import('@uiw/react-codemirror');
type LangsModule = typeof import('@uiw/codemirror-extensions-langs');
type ThemeModule = typeof import('@uiw/codemirror-theme-github');

export type CodeProps = {
  isLoading?: boolean;
  language: string;
} & Omit<ComponentProps<any>, 'extensions' | 'theme'>;

const Code = ({ language, isLoading, ...props }: CodeProps) => {
  const [isLibrariesLoaded, setIsLibrariesLoaded] = useState(false);
  const [CodeMirrorComponent, setCodeMirrorComponent] = useState<any>(null);
  const [languageExtension, setLanguageExtension] = useState<any>(null);
  const [basicSetupExtension, setBasicSetupExtension] = useState<any>(null);
  const [theme, setTheme] = useState<any>(null);
  const [currentThemeMode, setCurrentThemeMode] = useState<'light' | 'dark'>('light');

  // Load CodeMirror libraries dynamically
  useEffect(() => {
    const loadLibraries = async () => {
      try {
        const [codeMirrorModule, langsModule, themeModule] = await Promise.all([
          import('@uiw/react-codemirror') as Promise<CodeMirrorModule>,
          import('@uiw/codemirror-extensions-langs') as Promise<LangsModule>,
          import('@uiw/codemirror-theme-github') as Promise<ThemeModule>,
        ]);

        // Load the specific language extension
        await langsModule.loadLanguage(language as any);
        const langExtension = langsModule.langs[language as keyof typeof langsModule.langs];

        setCodeMirrorComponent(() => codeMirrorModule.default);
        setLanguageExtension(() => langExtension);
        setBasicSetupExtension(() => codeMirrorModule.basicSetup({ tabSize: 2 }));
        setTheme(currentThemeMode === 'dark' ? themeModule.githubDark : themeModule.githubLight);
        setIsLibrariesLoaded(true);
      } catch (error) {
        console.error('Failed to load CodeMirror libraries:', error);
      }
    };

    loadLibraries();
  }, [language, currentThemeMode]);

  // Handle theme updates
  useEffect(() => {
    const handleThemeUpdate = async (themeState: { themeMode: 'light' | 'dark' }) => {
      setCurrentThemeMode(themeState.themeMode);

      if (isLibrariesLoaded) {
        const themeModule = await import('@uiw/codemirror-theme-github');
        setTheme(
          themeState.themeMode === 'dark' ? themeModule.githubDark : themeModule.githubLight,
        );
      }
    };

    eventService.on('theme:updated', handleThemeUpdate);
    eventService.emit('theme:request-update-announce');

    return () => {
      eventService.off('theme:updated', handleThemeUpdate);
    };
  }, [isLibrariesLoaded]);

  const showLoading = isLoading || !isLibrariesLoaded;

  return showLoading ? (
    <div className="code-component w-full border border-base-300">
      <div className="skeleton w-full h-18" />
    </div>
  ) : (
    <div className="code-component border border-base-300 w-[calc(100%-1rem)]">
      {props.readOnly && (
        <div className="code-component-header flex justify-between items-center bg-base-200 p-2">
          <div className="code-component-header-title">Code: {language}</div>
          <div className="code-component-header-actions">
            <CopyButton value={props.value || ''} className="btn-ghost p-0 w-6 h-6" />
          </div>
        </div>
      )}
      {CodeMirrorComponent && languageExtension && basicSetupExtension && (
        <CodeMirrorComponent
          {...props}
          extensions={[languageExtension(), basicSetupExtension]}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Code;
