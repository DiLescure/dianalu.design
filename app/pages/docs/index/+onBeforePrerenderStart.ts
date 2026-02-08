// https://vike.dev/onPrerenderStart
import { taleCollectionMap } from '../taleCollectionMap';

export const onBeforePrerenderStart = async () => {
  const URLs: string[] = [];

  for (const category of taleCollectionMap) {
    // Direct category tales (/@category/@tale/)
    if (category.taleCollection) {
      for (const tale of category.taleCollection) {
        URLs.push(`/docs/${category.categorySlug}/${tale.slug}/`);
      }
    }

    // Child category tales (/@category/@subcategory/@tale/)
    if (category.childCategories) {
      for (const childCategory of category.childCategories) {
        for (const tale of childCategory.taleCollection) {
          URLs.push(`/docs/${category.categorySlug}/${childCategory.categorySlug}/${tale.slug}/`);
        }
      }
    }
  }

  // remove duplicates
  const uniqueURLs = Array.from(new Set(URLs));

  return uniqueURLs;
};
