import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import { BasicDataTableExample } from './examples/basic';
import { ColumnFiltersDataTableExample } from './examples/column-filters';
import { ColumnFiltersFacetedDataTableExample } from './examples/column-filters-faceted';
import { HeaderGroupsDataTableExample } from './examples/header-groups';
import TemplateTale from './index.tale.mdx';

type TaleContentProps = {};

const tale: TaleContent<TaleContentProps> = {
  taleComponent: () => {
    return (
      <TemplateTale
        BasicDataTableExample={BasicDataTableExample}
        HeaderGroupsDataTableExample={HeaderGroupsDataTableExample}
        ColumnFiltersDataTableExample={ColumnFiltersDataTableExample}
        ColumnFiltersFacetedDataTableExample={ColumnFiltersFacetedDataTableExample}
      />
    );
  },
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
