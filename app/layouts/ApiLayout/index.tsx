import { ApiProvider } from '@/services/api';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ApiProvider>{children}</ApiProvider>;
};

export default Layout;
