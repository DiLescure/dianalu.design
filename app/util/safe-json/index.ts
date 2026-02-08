import { extractValidJson } from './extract-valid-json';
import { safeCloseJson } from './safe-close-json';

export const safeJsonString = (value: string, defaultValue?: string): string => {
  try {
    // Extract valid JSON, close it if needed, then parse and re-stringify
    const extracted = extractValidJson(value);
    if (extracted === null) {
      // If we couldn't extract JSON, use the default or null
      if (typeof defaultValue !== 'undefined') {
        return defaultValue;
      }
      return 'null';
    }

    // Special handling for incomplete nested structures
    // If the input contains specific patterns that might be challenging to close properly,
    // We should handle them explicitly
    const closed = safeCloseJson(extracted);
    if (closed === null) {
      // If we couldn't close the JSON, use the default or null
      if (typeof defaultValue !== 'undefined') {
        return defaultValue;
      }
      return 'null';
    }

    if (
      /^\d+(\.\d+)?$/.test(closed) || // Special case for numeric values
      closed === 'true' || // Special case for boolean values
      closed === 'false' ||
      closed === 'null' // Special case for null
    ) {
      return closed;
    }

    // Try to parse the JSON (will throw if invalid)
    const parsedJson = JSON.parse(closed);

    return JSON.stringify(parsedJson, null, 2);
  } catch (_error) {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }
    return 'null';
  }
};

export const safeJsonObject = <T = any>(value: string, defaultValue?: T): T => {
  // console.log('safeJsonObject input:', value);
  try {
    const result = JSON.parse(safeJsonString(value)) as T;
    // console.log('safeJsonObject result:', result);

    if (result === null) {
      return typeof defaultValue !== 'undefined' ? defaultValue : (null as unknown as T);
    }

    return result;
  } catch {
    // If any error occurred during parsing, use the default or null
    return typeof defaultValue !== 'undefined' ? defaultValue : (null as unknown as T);
  }
};
