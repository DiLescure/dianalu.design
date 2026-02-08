export const normalizeBaseUrl = (url: string): string => {
  return url.replace(/\/\/([^:]+):443/, 'https://$1').replace(/^(\/\/)/, 'http://');
};
