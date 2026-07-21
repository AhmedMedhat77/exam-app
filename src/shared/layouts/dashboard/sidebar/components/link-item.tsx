import { ROUTES } from '@/app/routes';
import { useSidebarLinkStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { cn } from '@/shared/lib/utils';
import { Link, useLocation } from 'react-router';

interface Props {
  path: (typeof ROUTES)[keyof typeof ROUTES];
  title: string;
  icon: React.ReactNode;
}

function SidebarLinkItem({ path, title, icon }: Props) {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(path);
  const linkStyles = useSidebarLinkStyles(isActive);

  return (
    <Link to={path} className={cn(linkStyles)}>
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export default SidebarLinkItem;
