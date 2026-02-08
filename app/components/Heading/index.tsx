import React, { memo, useMemo, useRef } from 'react';

import { parseClassName } from '@/util/parse-class-name';
import CopyButton from '../CopyButton';

// Convert any string to a URL-friendly slug
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  noSlug?: boolean;
  copyValue?: string;
}

// Get the text content for slug generation
const getTextContent = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();

  const element = children as React.ReactElement<any>;
  if (React.isValidElement(children) && 'children' in element.props) {
    const childrenText = React.Children.toArray(element.props.children)
      .map((child) => getTextContent(child))
      .join('');

    return childrenText;
  }

  if (Array.isArray(children)) {
    return children.map((child) => getTextContent(child)).join('');
  }

  return '';
};

const Heading: React.FC<HeadingProps> = memo(
  ({ level, children, className = '', id, noSlug = false, copyValue }) => {
    const headingRef = useRef<HTMLHeadingElement>(null);

    // Generate ID from content if not provided explicitly - memoize to avoid recalculation
    const headingId = useMemo(() => {
      return id || (noSlug ? undefined : slugify(getTextContent(children)));
    }, [id, noSlug, children]);

    // Make the heading clickable to navigate to its anchor using native browser behavior
    const handleHeadingClick = (_e: React.MouseEvent) => {
      if (headingId) {
        // Update URL hash without page reload
        window.history.pushState(null, '', `#${headingId}`);
        // Scroll to the element
        const element = document.getElementById(headingId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Memoize props to avoid recreation on each render
    const headingProps = useMemo(
      () => ({
        ref: headingRef,
        id: headingId,
        className: parseClassName(
          'heading-component inline-flex items-end gap-2 group max-w-[calc(100%-2rem)]',
          className,
          headingId && 'cursor-pointer hover:underline',
        ),
        onClick: headingId ? handleHeadingClick : undefined,
      }),
      [headingId, className, handleHeadingClick],
    );

    const finalCopyValue =
      copyValue || `${window.location.origin}${window.location.pathname}#${headingId}`;

    const showCopyButton = Boolean(copyValue || headingId);

    const copyButtonIconClassName = Number(level) > 2 ? 'w-3 mb-3' : 'w-6 mb-2';
    const copyButtonSizeClassName = Number(level) > 2 ? 'w-4 h-4' : 'w-7 h-7';

    // Render the appropriate heading level
    const TagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
      <div className="heading-component">
        <TagName {...headingProps}>
          {children}
          {showCopyButton && (
            <CopyButton
              value={finalCopyValue}
              iconName="link"
              className={`btn-ghost opacity-0 group-hover:opacity-100 p-0 ${copyButtonSizeClassName}`}
              iconClassName={copyButtonIconClassName}
            />
          )}
        </TagName>
      </div>
    );
  },
);

Heading.displayName = 'Heading';

export default Heading;
