import { ROUTES } from '@/app/routes';
import SidebarLinkItem from '@/shared/layouts/dashboard/sidebar/components/link-item';
import { Logo } from '@/shared/layouts/dashboard/sidebar/components/logo';
import UserInfo from '@/shared/layouts/dashboard/sidebar/components/user-info';
import { useSidebarStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Home, UserRound } from 'lucide-react';

function Sidebar() {
  const { container } = useSidebarStyles();

  return (
    <aside className={cn(container)}>
      <div className="flex flex-col gap-10">
        <Logo />
        {/* Routes  */}
        <ul className="flex flex-col gap-2.5">
          <li>
            <SidebarLinkItem path={ROUTES.HOME} title="Home" icon={<Home />} />
          </li>
          <li>
            <SidebarLinkItem
              path={ROUTES.DIPLOMAS}
              title="Diplomas"
              icon={<GraduationCap />}
            />
          </li>
          <li>
            <SidebarLinkItem
              path={ROUTES.ACCOUNT_SETTINGS}
              title="Account Settings"
              icon={<UserRound />}
            />
          </li>
        </ul>
      </div>
      {/* Footer */}
      <UserInfo />
    </aside>
  );
}

export default Sidebar;
