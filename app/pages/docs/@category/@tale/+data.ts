import type { PageContextServer } from 'vike/types';
import { useConfig } from 'vike-react/useConfig';
import type { TaleMetadata } from '@/components/Taleforge/types';
import { taleCollectionMap } from '@/pages/docs/taleCollectionMap';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const config = useConfig();
  const { category: categorySlug, tale: taleSlug } = pageContext.routeParams;

  // Find the tale definition for validation
  const category = taleCollectionMap.find((c) => c.categorySlug === categorySlug);

  if (!category) {
    throw new Error(`Category "${categorySlug}" not found`);
  }

  let taleMetadata: TaleMetadata | undefined;
  let categoryTitle = category.categoryTitle;

  // Check if the tale is in the main category
  if (category.taleCollection) {
    taleMetadata = category.taleCollection.find((t) => t.slug === taleSlug);
  }

  // If not found in main category, check child categories
  if (!taleMetadata && category.childCategories) {
    for (const childCategory of category.childCategories) {
      taleMetadata = childCategory.taleCollection.find((t) => t.slug === taleSlug);
      if (taleMetadata) {
        categoryTitle = childCategory.categoryTitle;
        break;
      }
    }
  }

  if (!taleMetadata) {
    throw new Error(`Tale "${taleSlug}" not found in category "${categorySlug}"`);
  }

  config({
    title: `${taleMetadata.title || taleMetadata.slug} - ${categoryTitle} - Taleforge`,
  });

  return {
    selectedCategory: categorySlug,
    selectedTale: taleSlug,
    categoryTitle,
    talePath: taleMetadata.talePath,
    taleTitle: taleMetadata.title,
    disableTableOfContents: taleMetadata.disableTableOfContents,
  };
};
