import ProfileSidebar from '@/features/account-settings/components/profile-sidebar';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import { UserRound } from 'lucide-react';
import { Outlet } from 'react-router';

export default function UserProfileLayout() {
  return (
    <div className="mx-auto flex flex-1 flex-col gap-4">
      {/* Breadcrumb indicator */}
      <div className="text-sm font-medium text-gray-400">Account</div>

      {/* Header Banner */}
      <DiplomaHeader
        icon={<UserRound className="size-11.25 text-white" />}
        title="Account Settings"
      />

      {/* Main Layout Card */}
      <div className="flex min-h-full rounded-xl border border-dashed border-blue-300 bg-white p-6 shadow-xs">
        <ProfileSidebar />
        {/* Right Content Pane (Renders child routes profile page / change password page) */}
        <div className="flex-1 pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
