import type { GlobalConfig } from 'payload';

const DocsMockData: GlobalConfig = {
  slug: 'docsMockData',
  access: {
    read: () => true,
  },
  label: 'Public Mock Data',
  fields: [
    {
      name: 'mockData',
      type: 'json',
    },
  ],
};

export default DocsMockData;
