import { Fragment } from 'react/jsx-runtime';

import Icon, { type IconName } from '@/components/Icon';
import Link from '@/components/Link';

interface SidebarLink {
  label: string;
  to: string;
  icon: IconName;
  section?: string;
  isPrimary?: boolean;
}

const links: SidebarLink[] = [
  { label: 'Agent Hub', to: '/agent-hub/', icon: 'chatNew', isPrimary: false },
];

const bottomLinks: SidebarLink[] = [
  { label: 'Documentation', to: '/docs', icon: 'bookOpen' },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col w-80 min-h-full bg-base-200 text-base-content p-4">
      {/* Header */}
      <div className="mb-6 px-2">
        <Link
          to="/"
          className="text-xl font-bold flex items-center gap-2 no-underline text-base-content hover:text-primary transition-colors"
        >
          Clever Stack
        </Link>
      </div>

      <ul className="menu p-0 gap-1 flex-1">
        {links.map((link, index) => {
          const showSection =
            link.section && (index === 0 || links[index - 1].section !== link.section);

          if (link.isPrimary) {
            return (
              <li key={link.to} className="mb-2">
                <Link
                  to={link.to}
                  className="btn btn-primary btn-block text-white no-underline flex justify-center items-center gap-2 mb-4 hover:text-white"
                >
                  <Icon name={link.icon} className="w-5 h-5" />
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <Fragment key={link.to}>
              {showSection && (
                <li className="menu-title text-xs font-bold uppercase tracking-wider opacity-50 mt-4 mb-1">
                  {link.section}
                </li>
              )}
              <li>
                <Link to={link.to} className="flex gap-3">
                  <Icon name={link.icon} className="w-5 h-5 opacity-70" />
                  {link.label}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>

      {/* Bottom Links */}
      <div className="border-t border-base-300 pt-4 mt-4">
        <ul className="menu p-0 gap-1">
          {bottomLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="flex gap-3">
                <Icon name={link.icon} className="w-5 h-5 opacity-70" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
