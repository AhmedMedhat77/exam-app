import { ROUTES } from '@/app/routes';
import { cn } from '@/shared/lib/utils';
import { Link, useLocation } from 'react-router';

interface Props {
  path: (typeof ROUTES)[keyof typeof ROUTES];
  title: string;
  icon: React.ReactNode;
}

function SidebarLinkItem({ path, title, icon }: Props) {
  const { pathname } = useLocation();

  const isActiveRoute = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <Link
      to={path}
      className={cn(
        'flex items-center gap-2 py-4.5 hover:bg-blue-100 w-full px-4 border',
        isActiveRoute(path)
          ? 'text-primary bg-blue-100 border-primary '
          : 'text-gray-600 border-transparent'
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarLinkItem;
