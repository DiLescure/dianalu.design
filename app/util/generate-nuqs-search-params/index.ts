import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsJson,
  parseAsString,
} from 'nuqs';

const getArrayParser = (value: any[]) => {
  if (value.length < 1) return null;

  const firstItem = value[0];
  if (typeof firstItem === 'number') {
    return parseAsArrayOf(Number.isInteger(firstItem) ? parseAsInteger : parseAsFloat);
  }
  if (typeof firstItem === 'object') {
    return parseAsArrayOf(parseAsJson((v: any) => v));
  }
  return parseAsArrayOf(parseAsString);
};

export const getValueParser = (value: any) => {
  if (value === undefined) return null;

  switch (typeof value) {
    case 'string':
      return parseAsString;
    case 'number':
      return Number.isInteger(value) ? parseAsInteger : parseAsFloat;
    case 'boolean':
      return parseAsBoolean;
    case 'object':
      if (Array.isArray(value)) {
        return getArrayParser(value);
      }
      if (value instanceof Date) {
        return parseAsIsoDateTime;
      }
      return parseAsJson((v: any) => v);
    default:
      throw new Error(`Unsupported type: ${typeof value}`);
  }
};

export const generateNuqsSearchParams = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const parser = getValueParser(value);
    if (parser) {
      result[key] = parser;
    }
  }

  return result;
};
