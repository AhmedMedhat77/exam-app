import { ROUTES } from '@/app/routes';
import { useSidebarStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { cn } from '@/shared/lib/utils';
import { Link, useLocation } from 'react-router';

interface Props {
  path: (typeof ROUTES)[keyof typeof ROUTES];
  title?: string;
  icon?: React.ReactNode;
}

function SidebarLinkItem({ path, title, icon }: Props) {
  const { pathname } = useLocation();
  const isActive =
    path === '/' ? pathname === '/' || pathname.startsWith('/diploma') : pathname.startsWith(path);
  const { link } = useSidebarStyles();

  return (
    <Link to={path} className={cn(link(isActive))}>
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarLinkItem;
