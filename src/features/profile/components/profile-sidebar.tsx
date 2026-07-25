import ProfileSidebarItem from '@/features/profile/components/profile-sidebar-item';
import { PROFILE_ROUTES } from '@/features/profile/constants/routes';
import { renderSidebarIcon } from '@/features/profile/utils/render-sidebar-icon';
import { useUserStore } from '@/features/user/store/user.store';
import { LogOut } from 'lucide-react';
import { useLocation } from 'react-router';

export default function ProfileSidebar() {
  const location = useLocation();
  const { logout } = useUserStore();
  return (
    <aside className="flex w-70.5 flex-col justify-between border-r border-gray-100 bg-white p-6 pr-6">
      <nav className="space-y-1.5">
        {Object.values(PROFILE_ROUTES).map((route) => {
          const isActive = location.pathname.includes(route.path);

          return (
            <ProfileSidebarItem
              key={route.title}
              title={route.title}
              path={route.path}
              isActive={isActive}
              icon={renderSidebarIcon(route.title, isActive)}
            />
          );
        })}
      </nav>

      {/* Logout Button at bottom of sidebar */}
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2.5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-100"
        onClick={logout}
      >
        <LogOut className="size-4" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
