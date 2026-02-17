import type { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    description: 'Portfolio case studies',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // ============ HERO SECTION ============
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Case study title (e.g., "Softon Academy")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug (e.g., "softon-academy")',
      },
    },
    {
      name: 'heroTag',
      type: 'text',
      defaultValue: 'Case Study',
      admin: {
        description: 'Small text above title',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'One-liner below title (e.g., "4 months. 19-page brandbook...")',
      },
    },
    {
      name: 'heroStatement',
      type: 'text',
      admin: {
        description: 'Bold statement (e.g., "A software company needed developers...")',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero/parallax image',
      },
    },

    // ============ META INFO ============
    {
      name: 'meta',
      type: 'array',
      label: 'Meta Info',
      admin: {
        description: 'Role, Timeline, Scope, Outcome, etc.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },

    // ============ CONTENT SECTIONS (BLOCKS) ============
    {
      name: 'sections',
      type: 'blocks',
      label: 'Content Sections',
      blocks: [
        // --- TEXT SECTION ---
        {
          slug: 'textSection',
          labels: {
            singular: 'Text Section',
            plural: 'Text Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'theme',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default (White)', value: 'default' },
                { label: 'Dark', value: 'dark' },
                { label: 'Gray', value: 'gray' },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              admin: {
                description: 'Main content with paragraphs, bold, links, etc.',
              },
            },
          ],
        },

        // --- TABLE SECTION ---
        {
          slug: 'tableSection',
          labels: {
            singular: 'Table Section',
            plural: 'Table Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'theme',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default (White)', value: 'default' },
                { label: 'Dark', value: 'dark' },
                { label: 'Gray', value: 'gray' },
              ],
            },
            {
              name: 'tableHeadings',
              type: 'array',
              label: 'Column Headings (optional)',
              fields: [
                { name: 'heading', type: 'text' },
              ],
            },
            {
              name: 'rows',
              type: 'array',
              label: 'Table Rows',
              fields: [
                { name: 'col1', type: 'text', label: 'Column 1' },
                { name: 'col2', type: 'text', label: 'Column 2' },
              ],
            },
          ],
        },

        // --- BLOCKQUOTE ---
        {
          slug: 'blockquote',
          labels: {
            singular: 'Blockquote',
            plural: 'Blockquotes',
          },
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'attribution',
              type: 'text',
              admin: {
                description: 'Optional attribution/source',
              },
            },
          ],
        },

        // --- IMAGE ---
        {
          slug: 'image',
          labels: {
            singular: 'Image',
            plural: 'Images',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'fullWidth',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },

        // --- IMAGE GRID ---
        {
          slug: 'imageGrid',
          labels: {
            singular: 'Image Grid',
            plural: 'Image Grids',
          },
          fields: [
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // --- COLOR SWATCHES ---
        {
          slug: 'colorSwatches',
          labels: {
            singular: 'Color Swatches',
            plural: 'Color Swatches',
          },
          fields: [
            {
              name: 'colors',
              type: 'array',
              fields: [
                {
                  name: 'hex',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Hex color (e.g., #42CDDD)',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                },
              ],
            },
          ],
        },

        // --- OUTCOME GRID ---
        {
          slug: 'outcomeGrid',
          labels: {
            singular: 'Outcome Grid',
            plural: 'Outcome Grids',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // --- PLACEHOLDER ---
        {
          slug: 'placeholder',
          labels: {
            singular: 'Placeholder',
            plural: 'Placeholders',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Placeholder',
            },
            {
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ============ FOOTER ============
    {
      name: 'footerTagline',
      type: 'text',
      admin: {
        description: 'Footer headline',
      },
    },
    {
      name: 'footerSubtitle',
      type: 'text',
      admin: {
        description: 'Footer subtitle',
      },
    },
    {
      name: 'credits',
      type: 'array',
      label: 'Credits',
      fields: [
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
