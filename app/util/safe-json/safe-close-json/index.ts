type StackItem = 'root' | 'object' | 'key' | 'value' | 'array' | 'string' | 'escape';

const removeTrailingCommas = (str: string): string => {
  if (!str) return str;
  return str.replace(/,([\s\r\n\t]*[}\]])/g, '$1').replace(/,([\s\r\n\t]*)$/g, '$1');
};

const trimWhitespace = (str: string): string => {
  return str.replace(/^[\s|\r|\n|\t]+|[\s|\r|\n|\t]+$/g, '');
};

// Handle simple cases of incomplete JSON
const handleSimpleCases = (text: string): string | null | undefined => {
  // Incomplete string
  if (/^"[^"]*$/.test(text)) {
    return text.endsWith('\\') ? `${text.slice(0, -1)}"` : `${text}"`;
  }

  // Incomplete number
  if (/^\d+\.$/.test(text)) {
    return `${text}0`;
  }

  // Invalid starts that we can't fix
  if (/^(t|f|n|u)/.test(text) || /^[^"{[]/.test(text)) {
    return null;
  }

  return undefined; // Signal to continue with complex parsing
};

// Process a character based on the current parsing state
const processCharacter = (
  char: string,
  stack: StackItem[],
  result: string,
  stackChunk: string,
  keyOpen: boolean,
): {
  stack: StackItem[];
  result: string;
  stackChunk: string;
  keyOpen: boolean;
  shouldContinue: boolean;
} => {
  const currentStackItem = stack[stack.length - 1];
  let newResult = result;
  let newStackChunk = stackChunk;
  let newKeyOpen = keyOpen;

  // Handle escape sequences in strings
  if (currentStackItem === 'escape' && char !== '\\') {
    stack.pop();
    newResult += newStackChunk;
    newStackChunk = '';
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle string content
  if (currentStackItem === 'string') {
    if (char === '\\') {
      stack.push('escape');
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }

    if (char === '"') {
      stack.pop();
      newResult += newStackChunk;
      newStackChunk = '';
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }

    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Skip whitespace
  if (/\s|\r|\n|\t/.test(char)) {
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle array start
  if (char === '[') {
    if (currentStackItem === 'value') {
      stack.pop();
      newResult += newStackChunk;
      newStackChunk = '';
    }
    stack.push('array');
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle array content
  if (currentStackItem === 'array') {
    if (char === ']') {
      stack.pop();
      newResult += newStackChunk;
      newStackChunk = '';
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }

    if (char === '"') {
      stack.push('string');
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }

    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle object start
  if (char === '{') {
    if (currentStackItem === 'value') {
      stack.pop();
      newResult += newStackChunk;
      newStackChunk = '';
    }
    stack.push('object');
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle object content
  if (currentStackItem === 'object') {
    if (char === '}') {
      stack.pop();
      newResult += newStackChunk;
      newStackChunk = '';
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }

    if (char === '"') {
      stack.push('key');
      newResult += newStackChunk;
      newResult = newResult.slice(0, -1);
      newStackChunk = '"';
      newKeyOpen = true;
      return {
        stack,
        result: newResult,
        stackChunk: newStackChunk,
        keyOpen: newKeyOpen,
        shouldContinue: true,
      };
    }
  }

  // Handle key content
  if (currentStackItem === 'key' && char === '"') {
    newKeyOpen = false;
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  if (currentStackItem === 'key' && !newKeyOpen && char === ':') {
    stack.pop();
    stack.push('value');
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  // Handle value content
  if (currentStackItem === 'value' && char === '"') {
    stack.push('string');
    return {
      stack,
      result: newResult,
      stackChunk: newStackChunk,
      keyOpen: newKeyOpen,
      shouldContinue: true,
    };
  }

  if (currentStackItem === 'value' && (char === ',' || char === ']' || char === '}')) {
    stack.pop();
    newResult += newStackChunk;
    newStackChunk = '';
  }

  return {
    stack,
    result: newResult,
    stackChunk: newStackChunk,
    keyOpen: newKeyOpen,
    shouldContinue: false,
  };
};

// Complete any unclosed structures
const closeIncompleteStructures = (
  stack: StackItem[],
  result: string,
  stackChunk: string,
): string => {
  let finalResult = result;
  const currentStackItem = stack[stack.length - 1];

  if (finalResult === '' || currentStackItem === 'string') {
    finalResult += stackChunk;
  }

  while (stack.length > 1) {
    const item = stack.pop() as StackItem;

    if (item === 'string') finalResult += '"';
    if (item === 'array') finalResult += ']';
    if (item === 'object') finalResult += '}';
  }

  return finalResult;
};

export const safeCloseJson = (input: string): string | null => {
  if (input === '') return null;

  let result = removeTrailingCommas(trimWhitespace(input));

  try {
    // Try to parse and re-stringify the JSON
    return JSON.stringify(JSON.parse(result), null, 2);
  } catch {
    // Handle simple incomplete JSON cases
    const simpleResult = handleSimpleCases(result);
    if (simpleResult !== undefined) return simpleResult;

    // Set up for character-by-character parsing
    // let currentStackItem: StackItem = 'root';
    let stackItems: StackItem[] = ['root'];
    let stackChunk = '';
    let keyOpen = false;
    const unprocessed = result;
    result = '';

    // Special case for strings starting with quote
    if (unprocessed.startsWith('"')) {
      stackItems.push('string', 'string');
    }

    // Process each character
    for (const char of unprocessed) {
      stackChunk += char;
      // currentStackItem = stackItems[stackItems.length - 1];

      const processed = processCharacter(char, stackItems, result, stackChunk, keyOpen);
      stackItems = processed.stack;
      result = processed.result;
      stackChunk = processed.stackChunk;
      keyOpen = processed.keyOpen;

      if (processed.shouldContinue) continue;
    }

    // Close any incomplete structures
    return closeIncompleteStructures(stackItems, result, stackChunk);
  }
};
