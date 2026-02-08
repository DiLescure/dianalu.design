import { useData } from 'vike-react/useData';
import { usePageContext } from 'vike-react/usePageContext';

import type { TaleContent } from '@/components/Taleforge/types';
import TaleforgeLayout from '@/layouts/TaleforgeLayout';

import type { Data } from './+data';

const Page = () => {
  const { selectedCategory, selectedTale, taleTitle, disableTableOfContents } = useData<Data>();
  const { taleComponent, defaultValues, schema } = usePageContext() as unknown as TaleContent;

  // console.log('schema', schema);

  return (
    <TaleforgeLayout
      defaultValues={defaultValues}
      disableTableOfContents={disableTableOfContents}
      schema={schema}
      selectedCategory={selectedCategory}
      selectedTale={selectedTale}
      taleComponent={taleComponent}
      taleTitle={taleTitle}
    />
  );
};

export default Page;
