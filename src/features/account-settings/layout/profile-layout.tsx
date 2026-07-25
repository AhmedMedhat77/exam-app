import ProfileSidebar from '@/features/account-settings/components/profile-sidebar';
import DiplomaHeader from '@/features/diploma/components/shared/header';
import { UserRound } from 'lucide-react';
import { Outlet } from 'react-router';

export default function UserProfileLayout() {
  return (
    <div className="grid gap-4">
      {/* Header Banner */}
      <DiplomaHeader
        icon={<UserRound className="size-11.25 text-white" />}
        title="Account Settings"
      />

      {/* Main Layout Card */}
      <div className="flex h-[calc(100dvh-12rem)] w-full gap-3 rounded-xl shadow-xs">
        <ProfileSidebar />
        {/* Right Content Pane (Renders child routes profile page / change password page) */}
        <div className="flex-1 bg-white pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
