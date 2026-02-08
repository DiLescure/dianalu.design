export const parseClassName = (
  ...classNames: (string | ((...args: any[]) => string) | undefined)[]
) => {
  const finalClassNames = classNames.filter(Boolean).map((className) => {
    if (typeof className === 'function') {
      return className();
    }

    return className;
  });

  return finalClassNames.join(' ');
};
