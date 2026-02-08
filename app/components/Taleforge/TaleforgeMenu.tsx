import { useEffect, useState } from 'react';

import Link from '@/components/Link';
import type { TaleCollectionMap } from '@/components/Taleforge/types';

interface TaleforgeMenuProps {
  taleCollectionMap: TaleCollectionMap;
  selectedCategory: string;
  selectedTale: string;
}

const TaleforgeMenu = ({
  taleCollectionMap,
  selectedCategory,
  selectedTale,
}: TaleforgeMenuProps) => {
  // Track which categories are open in the menu
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Keep the selected category open whenever it changes
  // This ensures the category is open when directly navigating to a tale URL
  useEffect(() => {
    if (selectedCategory) {
      // Check if this is a combined slug (parent/child)
      if (selectedCategory?.includes('/')) {
        const [parentSlug] = selectedCategory.split('/');

        // Keep both the parent category and the combined category open
        setOpenCategories((prev) => ({
          ...prev,
          [selectedCategory]: true,
          [parentSlug]: true, // Open the parent category as well
        }));
      } else {
        // For direct categories, just open the category itself
        setOpenCategories((prev) => ({
          ...prev,
          [selectedCategory]: true,
        }));
      }
    }
  }, [selectedCategory]);

  // Toggle category open/closed state
  const toggleCategory = (categorySlug: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categorySlug]: !prev[categorySlug],
    }));
  };

  // Handle keyboard events for category toggles
  const handleKeyDown = (e: React.KeyboardEvent, categorySlug: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleCategory(categorySlug);
    }
  };

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: menu container with menubar role
    <ul className="menu w-full px-4 py-0" role="menubar">
      {taleCollectionMap.map((category) => {
        if (!category.taleCollection) {
          if (!category.childCategories) {
            throw new Error('Category has no child categories or tales');
          }

          const isOpen =
            openCategories[category.categorySlug] ||
            Object.keys(openCategories).some((key) => key.startsWith(`${category.categorySlug}/`));

          return (
            <li key={category.categorySlug} className="mb-2">
              {/* Category header with dropdown toggle */}
              <button
                type="button"
                className={`menu-dropdown-toggle font-bold w-full text-left ${
                  isOpen ? 'menu-dropdown-show' : ''
                }`}
                onClick={() => toggleCategory(category.categorySlug)}
                onKeyDown={(e) => handleKeyDown(e, category.categorySlug)}
                aria-expanded={isOpen}
                aria-controls={`${category.categorySlug}-menu`}
                role="menuitem"
              >
                {category.categoryTitle}
              </button>

              {/* Child categories (that are NOT dropdowns) within this category */}
              <ul
                id={`${category.categorySlug}-menu`}
                className={`menu-dropdown ${isOpen ? 'menu-dropdown-show' : ''}`}
                // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: submenu container
                role="menu"
              >
                {category.childCategories.map((childCategory) => {
                  const fullCategorySlug = `${category.categorySlug}/${childCategory.categorySlug}`;

                  return (
                    <li key={fullCategorySlug}>
                      <h2 className="menu-title">{childCategory.categoryTitle}</h2>
                      {/* biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: submenu container */}
                      <ul role="menu">
                        {childCategory.taleCollection.map((tale) => (
                          <li key={`${childCategory.categorySlug}/${tale.slug}`}>
                            <Link
                              to={`/docs/${category.categorySlug}/${childCategory.categorySlug}/${tale.slug}/`}
                              className={
                                `${category.categorySlug}/${childCategory.categorySlug}` ===
                                  fullCategorySlug && selectedTale === tale.slug
                                  ? 'menu-active'
                                  : ''
                              }
                            >
                              {tale.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }

        const isOpen =
          openCategories[category.categorySlug] ||
          Object.keys(openCategories).some((key) => key.startsWith(`${category.categorySlug}/`));

        return (
          <li key={category.categorySlug} className="mb-2">
            {/* Category header with dropdown toggle */}
            <button
              type="button"
              className={`menu-dropdown-toggle font-bold w-full text-left ${
                isOpen ? 'menu-dropdown-show' : ''
              }`}
              onClick={() => toggleCategory(category.categorySlug)}
              onKeyDown={(e) => handleKeyDown(e, category.categorySlug)}
              aria-expanded={isOpen}
              aria-controls={`${category.categorySlug}-menu`}
              role="menuitem"
            >
              {category.categoryTitle}
            </button>

            {/* Tales within this category */}
            <ul
              id={`${category.categorySlug}-menu`}
              className={`menu-dropdown ${isOpen ? 'menu-dropdown-show' : ''}`}
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: submenu container
              role="menu"
            >
              {category.taleCollection.map((tale) => (
                <li key={`${category.categorySlug}-${tale.slug}`}>
                  <Link
                    to={`/docs/${category.categorySlug}/${tale.slug}/`}
                    className={
                      selectedCategory === category.categorySlug && selectedTale === tale.slug
                        ? 'menu-active'
                        : ''
                    }
                  >
                    {tale.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default TaleforgeMenu;
