import type { JSX } from 'react';

export const composeProviders = (
  ...providers: (
    | React.ComponentType<{ children: React.ReactNode }>
    | ((props: { children: React.ReactNode }) => JSX.Element)
  )[]
) => {
  return providers.reduceRight(
    (Acc, Provider) =>
      ({ children }: { children: React.ReactNode }) => {
        return (
          <Provider>
            <Acc>{children}</Acc>
          </Provider>
        );
      },
    ({ children }: { children: React.ReactNode }) => <>{children}</>,
  );
};
