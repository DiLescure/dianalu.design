import { useConfig } from 'vike-react/useConfig';
import { defaultTale, taleCollectionMap } from '@/pages/docs/taleCollectionMap';

export type Data = Awaited<ReturnType<typeof data>>;

const findDefaultTaleRoute = (): string => {
  // Find the default tale in the tale collection map to construct its URL
  for (const category of taleCollectionMap) {
    if (category.taleCollection) {
      const found = category.taleCollection.find((tale) => tale === defaultTale);
      if (found) {
        return `/docs/${category.categorySlug}/${found.slug}/`;
      }
    }

    if (category.childCategories) {
      for (const childCategory of category.childCategories) {
        const found = childCategory.taleCollection.find((tale) => tale === defaultTale);
        if (found) {
          return `/docs/${category.categorySlug}/${childCategory.categorySlug}/${found.slug}/`;
        }
      }
    }
  }

  // Fallback if default tale not found (shouldn't happen)
  return '/docs/taleforge/introduction/';
};

export const data = async () => {
  const config = useConfig();

  config({
    title: 'Taleforge - Component Stories',
  });

  // Return the default tale URL for client-side redirect
  const defaultTaleUrl = findDefaultTaleRoute();

  // Return data for client-side redirect
  return {
    defaultTaleUrl,
  };
};
