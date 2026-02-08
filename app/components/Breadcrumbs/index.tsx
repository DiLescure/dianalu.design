import type { FC, JSX } from 'react';

type BreadcrumbsProps = {
  children: JSX.Element[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ children }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-left">
        {children.map((child: JSX.Element, index) => (
          <li key={`breadcrumb-${index}`}>
            {index !== children.length - 1 ? (
              <>
                {child}
                <span className="text-gray-400 mx-2">&gt;</span>
              </>
            ) : (
              <span className="text-gray-500">{child}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
