import UserDashboardHeader from '@/shared/components/user-dashboard-header';
import ProfileSidebar from '@/features/profile/components/profile-sidebar';
import { UserRound } from 'lucide-react';
import { Outlet } from 'react-router';

export default function UserProfileLayout() {
  return (
    <div className="grid gap-4">
      {/* Header Banner */}
      <UserDashboardHeader
        icon={<UserRound className="size-11.25 text-white" />}
        title="Account Settings"
      />

      {/* Main Layout Card */}
      <div className="flex h-[calc(100dvh-12rem)] gap-3 rounded-xl shadow-xs">
        <ProfileSidebar />
        {/* Right Content Pane (Renders child routes profile page / change password page) */}
        <div className="max-w-full flex-1 bg-white pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
