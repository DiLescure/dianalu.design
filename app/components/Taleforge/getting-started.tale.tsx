import { z } from 'zod';

import Code from '@/components/Code';
import Heading from '@/components/Heading';
import type { TaleContent } from '@/components/Taleforge/types';
import TaleMarkdown from './getting-started.tale.mdx';

const tale: TaleContent = {
  taleComponent: () => (
    <>
      <p>
        To explore the component library, use the menu on the left to navigate between different
        component categories and tales.
      </p>
      <p>
        Each tale includes a collapsible "Controls" panel at the bottom of the page. Click on it to
        reveal interactive controls for the component, generated automatically from its schema
        definition.
      </p>

      <Heading level={2}>Creating Your Own Tales</Heading>
      <p>
        To create a new tale for a component, create a file named{' '}
        <code>[component-name].tale.tsx</code> with the following structure:
      </p>
      <Code
        readOnly={true}
        language="tsx"
        value={`import type { TaleDefinition } from '@/components/Taleforge/types';
import { z } from 'zod';

const tale: TaleDefinition<YourComponentState> = {
  title: 'Your Component Name',
  slug: 'your-component',
  taleContent: ({ taleState }) => (
    <>
      {/* Display your component with the state */}
      <YourComponent {...taleState} />
    </>
  ),
  schema: z.object({
    // Define your component props with Zod
    propName: z.string(),
    // Add more props as needed
  }),
  defaultValues: {
    // Set default values for your props
    propName: 'Default value',
  },
};

export default tale;`}
      />

      <p>
        Then, add your tale to the appropriate category in <code>app/pages/docs/tales.ts</code>.
      </p>

      <TaleMarkdown />
    </>
  ),
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
