import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import SidebarLinkItem from '@/shared/layouts/dashboard/sidebar/components/link-item';
import { Logo } from '@/shared/layouts/dashboard/sidebar/components/logo';
import UserInfo from '@/shared/layouts/dashboard/sidebar/components/user-info';
import { cn } from '@/shared/lib/utils';
import { GraduationCap, Home, UserRound } from 'lucide-react';

function Sidebar() {
  const haveAdminRules = useUserStore((state) => state.haveAdminRules);

  return (
    <aside
      className={cn(
        'w-90.5 border-r flex flex-col justify-between p-10',
        haveAdminRules
          ? 'bg-gray-800 border-gray-800'
          : 'bg-blue-50 border-blue-50'
      )}
    >
      <div className="flex flex-col gap-10">
        <Logo isAdmin={haveAdminRules} />
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
      <UserInfo isAdmin={haveAdminRules} />
    </aside>
  );
}

export default Sidebar;
