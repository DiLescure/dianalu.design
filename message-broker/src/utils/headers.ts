import type { IncomingHttpHeaders } from 'node:http';
import { camelCase } from 'change-case';

export type CamelCaseHeaders = Record<string, string | string[] | undefined>;

export const camelCaseHeaders = (headers: IncomingHttpHeaders): CamelCaseHeaders => {
  return Object.entries(headers).reduce((acc, [key, value]) => {
    acc[camelCase(key)] = value;
    return acc;
  }, {} as CamelCaseHeaders);
};
