const convertValue = (value: string): any => {
  // Handle boolean values
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Handle null and undefined
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;

  // Handle JSON objects/arrays (try parsing first)
  if (
    (value.startsWith('{') && value.endsWith('}')) ||
    (value.startsWith('[') && value.endsWith(']'))
  ) {
    try {
      return JSON.parse(value);
    } catch {
      // If JSON parsing fails, continue with other conversions
    }
  }

  // Handle ISO date strings
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  // Handle comma-separated arrays
  if (value.includes(',')) {
    const arrayValues = value.split(',').map((item) => convertValue(item.trim()));
    return arrayValues;
  }

  // Handle integers (including negative)
  if (/^-?\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }

  // Handle floats (including negative)
  if (/^-?\d*\.\d+$/.test(value)) {
    return Number.parseFloat(value);
  }

  // Return as string if no conversion applies
  return value;
};

export const searchParamsStringToJson = (searchParamsString: string) => {
  const searchParams = new URLSearchParams(searchParamsString);
  const result: Record<string, any> = {};

  for (const [key, value] of searchParams.entries()) {
    result[key] = convertValue(value);
  }

  return result;
};
