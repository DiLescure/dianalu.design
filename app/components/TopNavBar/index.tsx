import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import ColorSchemeButton from '@/components/ColorSchemeButton';
import Icon from '@/components/Icon';
import Link from '@/components/Link';

export const TopNavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 border-b border-base-300 px-4 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex-none">
          <label htmlFor="app-drawer" className="btn btn-square btn-ghost lg:hidden drawer-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <title>Menu</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl lg:hidden">
            Clever Stack
          </Link>
        </div>
        <div className="flex-none flex items-center gap-2">
          <Button onPress={() => {}} className="btn btn-ghost btn-circle" aria-label="Help">
            <Icon name="info" className="w-5 h-5" />
          </Button>
          <ColorSchemeButton className="btn btn-ghost btn-circle">
            {(themeMode) => <Icon name={themeMode === 'dark' ? 'sun' : 'moon'} className="w-5 h-5" />}
          </ColorSchemeButton>
          <div className="ml-2 cursor-pointer">
            <Avatar initials="CS" size="sm" />
          </div>
        </div>
      </div>
    </>
  );
};
