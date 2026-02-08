import { createSerializer } from 'nuqs';
import { usePageContext } from 'vike-react/usePageContext';

import { generateNuqsSearchParams } from '@/util/generate-nuqs-search-params';
import { parseClassName } from '@/util/parse-class-name';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  rel?: string;
  searchParams?: Record<string, any>;
}

const Link = ({ to, children, external, className, rel, searchParams }: LinkProps) => {
  const pageContext = usePageContext();
  const { urlPathname, locale } = pageContext;
  const isActive = to === '/' ? urlPathname === to : urlPathname.startsWith(to);

  const finalClassName = parseClassName(
    'link-component',
    className,
    isActive ? 'is-active' : undefined,
  );
  const finalRel = external ? parseClassName('noopener noreferrer', rel) : rel;

  let finalTo = to;

  if (searchParams && Object.keys(searchParams).length > 0) {
    const nuqsSearchParams = generateNuqsSearchParams(searchParams);
    const serialize = createSerializer(nuqsSearchParams);
    finalTo = `${to}${serialize(searchParams)}`;
  }

  if (finalTo === '/' || /^\/[^/]/.test(finalTo)) {
    finalTo = `/${locale}${finalTo}`;
  }

  return (
    <a
      href={finalTo}
      className={finalClassName}
      rel={finalRel}
      target={external ? '_blank' : undefined}
    >
      {children}
    </a>
  );
};

export default Link;
