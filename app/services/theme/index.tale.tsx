import { useEffect, useState } from 'react';
import { z } from 'zod';

import type { ComboBoxItemType } from '@/components/ComboBox';
import type { TaleContent } from '@/components/Taleforge/types';
import eventService from '@/services/event';

import ThemeServiceTale from './index.tale.mdx';

const themeOptions: ComboBoxItemType[] = [
  {
    id: 'default',
    name: 'Default Theme',
  },
  {
    id: 'alternate',
    name: 'Alternate Theme',
  },
];

const tale: TaleContent = {
  taleComponent: () => {
    const [themeName, setThemeName] = useState<string>('default');

    useEffect(() => {
      const handleThemeUpdated = ({ themeName }: { themeName: string }) => {
        setThemeName(themeName as string);
      };

      eventService.on('theme:updated', handleThemeUpdated);

      eventService.emit('theme:request-update-announce');

      return () => {
        eventService.off('theme:updated', handleThemeUpdated);
      };
    }, [setThemeName]);

    const handleThemeRequestUpdate = (themeName: string) => {
      console.log('handleThemeRequestUpdate', themeName);
      eventService.emit('theme:request-update', themeName);
    };

    return (
      <ThemeServiceTale
        themeName={themeName}
        setThemeName={setThemeName}
        themeOptions={themeOptions}
        handleThemeRequestUpdate={handleThemeRequestUpdate}
      />
    );
  },
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
