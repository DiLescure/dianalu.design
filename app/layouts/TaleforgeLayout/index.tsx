import { useEffect, useMemo } from 'react';

import ColorSchemeButton from '@/components/ColorSchemeButton';
import Taleforge from '@/components/Taleforge';
import TaleforgeMenu from '@/components/Taleforge/TaleforgeMenu';
import type { TaleContent, TaleMetadata } from '@/components/Taleforge/types';
import { taleCollectionMap } from '@/pages/docs/taleCollectionMap';

import './styles.css';
import Icon from '@/components/Icon';

type TaleforgeLayoutProps = TaleContent & {
  selectedCategory: string;
  selectedTale: string;
  taleTitle?: string;
  disableTableOfContents?: boolean;
};

const openDrawerOnLargeScreen = () => {
  const drawerToggle = document.getElementById('DrawerToggle') as HTMLInputElement;
  if (drawerToggle) {
    drawerToggle.checked = window.matchMedia('(min-width: 1024px)').matches;
  }
};

const TaleforgeLayout = ({
  selectedCategory,
  selectedTale,
  taleComponent,
  defaultValues,
  schema,
  taleTitle,
  disableTableOfContents,
}: TaleforgeLayoutProps) => {
  useEffect(() => {
    openDrawerOnLargeScreen();
  }, []);

  // Find the selected tale definition, supporting child categories
  // Use server-side definitions when available (SSR), client-side when loaded
  const selectedTaleDefinition = useMemo(() => {
    const taleMetadata = taleCollectionMap
      .find((c) => c.categorySlug === selectedCategory)
      ?.taleCollection?.find((t) => t.slug === selectedTale) as TaleMetadata;
    return {
      ...taleMetadata,
      taleComponent,
      defaultValues,
      schema,
    };
  }, [selectedCategory, selectedTale]);

  // console.log('selectedTale', selectedTale);

  // console.log('selectedTaleDefinition', selectedTaleDefinition);

  return (
    <>
      <div id="TaleforgeNav" className="drawer">
        <input
          id="DrawerToggle"
          type="checkbox"
          className="drawer-toggle peer"
          // onChange={toggleDrawer}
        />
        <span
          className="taleforge-nav-strip peer-checked:hidden tooltip before:text-xs before:content-[attr(data-tip)]"
          data-tip="Menu"
        >
          <label htmlFor="DrawerToggle" className="btn btn-square btn-ghost drawer-button">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <title>Menu Icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </span>
        <div className="taleforge-content drawer-content">
          {selectedTaleDefinition && (
            <Taleforge
              key={`${selectedCategory}-${selectedTale}`}
              {...selectedTaleDefinition}
              title={taleTitle}
              disableTableOfContents={disableTableOfContents}
            />
          )}
        </div>
        <div className="taleforge-nav drawer-side lg:peer-checked:block lg:peer-checked:sticky">
          <aside className="flex flex-col h-full">
            <div className="flex items-center px-4 pt-4">
              <div className="flex flex-1 items-center gap-2 text-2xl font-bold">
                <Icon name="bookOpen" className="w-6 h-6" />
                Docs
              </div>
              <label
                htmlFor="DrawerToggle"
                className="btn btn-square btn-ghost drawer-button drawer-overlay"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <title>Close Menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>
            <div className="divider" />
            <div className="flex-1 overflow-y-auto">
              <TaleforgeMenu
                taleCollectionMap={taleCollectionMap}
                selectedCategory={selectedCategory}
                selectedTale={selectedTale}
              />
            </div>
            <div className="divider mt-auto mb-0" />
            <div className="p-4 flex justify-center">
              <ColorSchemeButton className="btn btn-ghost gap-2">
                {(themeMode) =>
                  themeMode === 'dark' ? (
                    <>
                      <Icon name="sun" className="w-6 h-6" />
                      <span>Light mode</span>
                    </>
                  ) : (
                    <>
                      <Icon name="moon" className="w-6 h-6" />
                      <span>Dark mode</span>
                    </>
                  )
                }
              </ColorSchemeButton>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default TaleforgeLayout;
