import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user, // Allow authenticated users to upload
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      defaultValue: 'No alt provided',
      admin: {
        description: 'Alternative text for accessibility. Defaults to filename if not provided.',
      },
    },
  ],
  upload: true,
};
