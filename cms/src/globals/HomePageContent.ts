import type { GlobalConfig } from 'payload';

export const HomePageContent: GlobalConfig = {
  slug: 'homePageContent',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user, // Allow authenticated users to upload
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'No tagline provided',
      admin: {
        description: 'Tagline text for the homepage.',
      },
    },
  ],
};
