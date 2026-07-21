import { ROUTES } from '@/app/routes';
import SidebarLinkItem from '@/shared/layouts/dashboard/sidebar/components/link-item';
import { Logo } from '@/shared/layouts/dashboard/sidebar/components/logo';
import UserInfo from '@/shared/layouts/dashboard/sidebar/components/user-info';
import { GraduationCap, Home, UserRound } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-90.5 border-r border-blue-50 bg-blue-50  flex flex-col justify-between p-10">
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
