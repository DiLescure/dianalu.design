import type { ComponentType, JSX } from 'react';
import type { ZodObject } from 'zod';

export type TaleComponent<T extends Record<string, any>> = ComponentType<T>;

export type TaleOnChangeFn = (
  options:
    | {
        value: any;
        fieldApi: Record<string, any>;
      }
    | {
        value: any;
        stateKey: string;
      },
) => void;

// Define a type for the Taleforge virtual page state
export interface TaleforgeVirtualState {
  taleStateKey: string;
  taleStates?: Record<string, any>;
  taleGetState: () => Record<string, any>;
  taleOnChange: TaleOnChangeFn;
}

export interface TaleMetadata {
  title?: string;
  slug: string;
  talePath: string;
  disableTableOfContents?: boolean;
}

export type TaleCollection = TaleMetadata[];

export interface TaleContent<TaleState = Record<string, any>> {
  taleComponent: TaleComponent<{ taleOnChange: TaleOnChangeFn; taleState: TaleState }>;
  defaultValues: Partial<TaleState>;
  schema: ZodObject<Record<string, any>>;
}

export type TaleDefinition<TaleState = Record<string, any>> = TaleMetadata & TaleContent<TaleState>;

export type Tale = (props: TaleDefinition) => JSX.Element;

export interface TaleCategoryMetadata {
  categoryTitle: string;
  categorySlug: string;
  childCategories?: {
    categoryTitle: string;
    categorySlug: string;
    taleCollection: TaleCollection;
  }[];
  taleCollection?: TaleCollection;
}

export type TaleCollectionMap = TaleCategoryMetadata[];

export interface TaleRoute {
  categorySlug: string;
  categoryTitle: string;
  taleSlug: string;
  taleTitle: string;
  href: string;
}
