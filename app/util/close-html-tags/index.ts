type TagState = {
  stack: string[];
  result: string;
  currentTag: string;
  inTag: boolean;
  inClosingTag: boolean;
};

const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const processChar = (state: TagState, char: string): void => {
  state.result += char;

  switch (char) {
    case '<':
      state.inTag = true;
      state.currentTag = '';
      break;
    case '>':
      if (state.inTag) {
        handleClosingBracket(state);
      }
      break;
    case '/':
      if (state.inTag && state.currentTag === '') {
        state.inClosingTag = true;
      }
      break;
    default:
      if (state.inTag && char !== ' ' && char !== '/') {
        state.currentTag += char.toLowerCase();
      }
  }
};

const handleClosingBracket = (state: TagState): void => {
  state.inTag = false;
  if (state.inClosingTag) {
    state.inClosingTag = false;
    if (state.stack.length > 0 && state.stack[state.stack.length - 1] === state.currentTag) {
      state.stack.pop();
    }
  } else if (state.currentTag !== '' && !VOID_ELEMENTS.has(state.currentTag)) {
    state.stack.push(state.currentTag);
  }
};

const closeHtmlTags = (html: string): string => {
  const state: TagState = {
    stack: [],
    result: '',
    currentTag: '',
    inTag: false,
    inClosingTag: false,
  };

  for (const char of html) {
    processChar(state, char);
  }

  while (state.stack.length > 0) {
    const tag = state.stack.pop();
    state.result += `</${tag}>`;
  }

  return state.result;
};

export default closeHtmlTags;
