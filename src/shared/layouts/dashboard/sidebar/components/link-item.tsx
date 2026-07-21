import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import { cn } from '@/shared/lib/utils';
import { Link, useLocation } from 'react-router';

interface Props {
  path: (typeof ROUTES)[keyof typeof ROUTES];
  title: string;
  icon: React.ReactNode;
}

const getAdminStyles = (isActive: boolean) => {
  return cn(
    'bg-transparent border text-white',
    isActive ? 'bg-gray-700 border-gray-400' : 'border-transparent'
  );
};

const getUserStyles = (isActive: boolean) => {
  return cn(
    'hover:bg-blue-100 w-full px-4 border',
    isActive
      ? 'text-primary bg-blue-100 border-primary'
      : 'text-gray-600 border-transparent'
  );
};

function SidebarLinkItem({ path, title, icon }: Props) {
  const { pathname } = useLocation();
  const haveAdminRules = useUserStore((state) => state.haveAdminRules);

  const isActive = pathname.startsWith(path);

  return (
    <Link
      to={path}
      className={cn(
        'flex items-center gap-2 px-4 py-4.5',
        haveAdminRules ? getAdminStyles(isActive) : getUserStyles(isActive)
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarLinkItem;
