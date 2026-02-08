import ShortUniqueId from 'short-unique-id';

export * from './common-error-handler';

export type WithId<T> = T & {
  id: string;
};

export type WithOptionalId<T> = T & {
  id?: string;
};

export const uid = new ShortUniqueId({ length: 16 });

export const handleVisibilityChange = (callback: () => any) => () => {
  if (!document.hidden) {
    callback();
  }
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
