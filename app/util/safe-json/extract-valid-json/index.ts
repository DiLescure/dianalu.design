type JsonPrimitive = 'true' | 'false' | 'null' | 'number' | 'string';

const isPrimitiveStart = (char: string): JsonPrimitive | null => {
  if (char === 't') return 'true';
  if (char === 'f') return 'false';
  if (char === 'n') return 'null';
  if (char === '"') return 'string';
  if (/[-\d]/.test(char)) return 'number';
  return null;
};

const isValidPartialJson = (str: string): boolean => {
  // Given a string that is being streamed, thus might be incomplete,
  // return true if the string is comprised of a sequence of valid JSON tokens (even if the total JSON is not yet complete)
  if (!str || typeof str !== 'string') return false;

  const trimmed = str.trim();
  if (!trimmed) return false;

  // Check if it might be an object or array
  if (['{', '['].includes(trimmed[0])) return true;

  // Check if it might be a primitive JSON value
  const primitive = isPrimitiveStart(trimmed[0]);
  if (!primitive) return false;

  // For primitives, do some basic validation
  if (primitive === 'true' && !trimmed.startsWith('true')) return false;
  if (primitive === 'false' && !trimmed.startsWith('false')) return false;
  if (primitive === 'null' && !trimmed.startsWith('null')) return false;

  // For string, just check if it starts with a quote
  if (primitive === 'string' && trimmed[0] === '"') return true;

  // For number, check if it looks like a valid number starting
  if (primitive === 'number') {
    return /^-?\d+(\.\d*)?([eE][+-]?\d*)?$/.test(trimmed);
  }

  return true;
};

export const extractValidJson = (str: string): string | null => {
  // Extract the json from the first markdown code block within a string
  // If isValidPartialJson returns true, return the string
  // If a code block opening is found, return the json string up to the code block closing or the end of the string
  // If no code block opening is found, return null
  if (!str || typeof str !== 'string') return null;

  // First, check if the string looks like valid JSON already
  if (isValidPartialJson(str)) {
    return str;
  }

  // Regular expressions to find markdown code blocks
  const codeBlockRegex = /```(?:json|js|ts|jsx|tsx|mjs)?\s*\n([\s\S]*?)(?:\n```|$)/;
  const codeBlockMatch = str.match(codeBlockRegex);

  if (codeBlockMatch?.[1]) {
    const jsonContent = codeBlockMatch[1].trim();
    if (jsonContent && isValidPartialJson(jsonContent)) {
      return jsonContent;
    }
  }

  return null;
};
