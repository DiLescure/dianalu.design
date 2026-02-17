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
    {
      name: 'dummyContent',
      type: 'text',
      required: false,
      defaultValue: '',
      admin: {
        description: 'Dummy content for testing purposes.',
      },
    },
  ],
};
