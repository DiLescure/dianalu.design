import type { TaleCollectionMap, TaleMetadata } from '@/components/Taleforge/types';

export const defaultTale: TaleMetadata = {
  title: 'Introduction',
  slug: 'intro',
  talePath: 'components/Taleforge/index.tale',
  disableTableOfContents: true,
};

// Define the tale definition map with categories and tales
export const taleCollectionMap: TaleCollectionMap = [
  {
    categoryTitle: 'Taleforge',
    categorySlug: 'taleforge',
    taleCollection: [
      defaultTale,
      {
        title: 'Getting Started',
        slug: 'getting-started',
        talePath: 'components/Taleforge/getting-started.tale',
        disableTableOfContents: true,
      },
      {
        title: 'Basics',
        slug: 'basics',
        talePath: 'components/Taleforge/basics.tale',
        disableTableOfContents: true,
      },
    ],
  },
  {
    categoryTitle: 'Components',
    categorySlug: 'components',
    childCategories: [
      {
        categoryTitle: 'Navigation',
        categorySlug: 'navigation',
        taleCollection: [
          {
            title: 'Heading',
            slug: 'heading',
            talePath: 'components/Heading/index.tale',
          },
          {
            title: 'Breadcrumbs',
            slug: 'breadcrumbs',
            talePath: 'components/Breadcrumbs/index.tale',
          },
          {
            title: 'Link',
            slug: 'link',
            talePath: 'components/Link/index.tale',
          },
        ],
      },
      {
        categoryTitle: 'Actions',
        categorySlug: 'actions',
        taleCollection: [
          {
            title: 'Button',
            slug: 'button',
            talePath: 'components/Button/index.tale',
          },
          {
            title: 'Modal (Basic)',
            slug: 'modal',
            talePath: 'components/Modal/basic.tale',
            disableTableOfContents: true,
          },
          {
            title: 'Modal (Form)',
            slug: 'modal-form',
            talePath: 'components/Modal/form.tale',
          },
        ],
      },
      {
        categoryTitle: 'Feedback',
        categorySlug: 'feedback',
        taleCollection: [
          {
            title: 'Loading Overlay',
            slug: 'loading-overlay',
            talePath: 'components/LoadingOverlay/index.tale',
            disableTableOfContents: true,
          },
          {
            title: 'Icon',
            slug: 'icon',
            talePath: 'components/Icon/index.tale',
            disableTableOfContents: true,
          },
          {
            title: 'Toast',
            slug: 'toast',
            talePath: 'components/Toast/index.tale',
          },
        ],
      },
      {
        categoryTitle: 'Data Input',
        categorySlug: 'data-input',
        taleCollection: [
          {
            title: 'ComboBox',
            slug: 'combobox',
            talePath: 'components/ComboBox/index.tale',
          },
          {
            title: 'Text Field',
            slug: 'text-field',
            talePath: 'components/TextField/index.tale',
          },
          {
            title: 'Text Area',
            slug: 'text-area',
            talePath: 'components/TextArea/index.tale',
          },
          {
            title: 'Date Picker',
            slug: 'date-picker',
            talePath: 'components/DatePicker/index.tale',
          },
          {
            title: 'Date Range Picker',
            slug: 'date-range-picker',
            talePath: 'components/DateRangePicker/index.tale',
          },
          {
            title: 'Time Field',
            slug: 'time-field',
            talePath: 'components/TimeField/index.tale',
          },
          {
            title: 'Slider',
            slug: 'slider',
            talePath: 'components/Slider/index.tale',
          },
          {
            title: 'MinMaxSlider',
            slug: 'min-max-slider',
            talePath: 'components/MinMaxSlider/index.tale',
          },
        ],
      },
      {
        categoryTitle: 'Third Party',
        categorySlug: 'third-party',
        taleCollection: [
          {
            title: 'Notes Field',
            slug: 'notes-field',
            talePath: 'components/NotesField/index.tale',
          },
          {
            title: 'Kanban',
            slug: 'kanban',
            talePath: 'components/Kanban/index.tale',
            disableTableOfContents: true,
          },
          {
            title: 'DataTable',
            slug: 'data-table',
            talePath: 'components/DataTable/index.tale',
          },
        ],
      },
      {
        categoryTitle: 'Utilities',
        categorySlug: 'utilities',
        taleCollection: [
          {
            title: 'Copy Button',
            slug: 'copy-button',
            talePath: 'components/CopyButton/index.tale',
          },
          {
            title: 'Tutorial Modal',
            slug: 'tutorial-modal',
            talePath: 'components/TutorialModal/index.tale',
          },
          {
            title: 'Color Scheme Button',
            slug: 'color-scheme-button',
            talePath: 'components/ColorSchemeButton/index.tale',
          },
        ],
      },
    ],
  },
  {
    categoryTitle: 'Services / Providers',
    categorySlug: 'services',
    taleCollection: [
      {
        title: 'API Service',
        slug: 'api-service',
        talePath: 'services/api/index.tale',
        disableTableOfContents: true,
      },
      {
        title: 'Overlay Service',
        slug: 'overlay-service',
        talePath: 'services/overlay/index.tale',
      },
      {
        title: 'Theme Service',
        slug: 'theme-service',
        talePath: 'services/theme/index.tale',
      },
      {
        title: 'Search Parameters Provider',
        slug: 'search-parameters',
        talePath: 'components/Link/nuqs.tale',
      },
    ],
  },
];
