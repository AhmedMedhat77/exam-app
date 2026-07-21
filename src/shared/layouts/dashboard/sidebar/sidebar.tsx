import { ADMIN_ROUTES, ROUTES, USER_ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import SidebarLinkItem from '@/shared/layouts/dashboard/sidebar/components/link-item';
import { Logo } from '@/shared/layouts/dashboard/sidebar/components/logo';
import UserInfo from '@/shared/layouts/dashboard/sidebar/components/user-info';
import { useSidebarStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, UserRound } from 'lucide-react';
import { useMemo } from 'react';

function Sidebar() {
  const { container } = useSidebarStyles();
  const isAdmin = useUserStore((state) => state.isAdmin);

  const routes = useMemo(() => {
    if (isAdmin) {
      return ADMIN_ROUTES;
    }
    return USER_ROUTES;
  }, [isAdmin]);

  return (
    <aside className={cn(container)}>
      <div className="flex flex-col gap-10">
        <Logo />
        {/* Routes  */}
        <ul className="flex flex-col gap-2.5">
          {routes.map((route) => (
            <li key={route.title}>
              <SidebarLinkItem
                path={route.path}
                title={route.title}
                icon={route.icon}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Footer */}
      <UserInfo />
    </aside>
  );
}

export default Sidebar;
