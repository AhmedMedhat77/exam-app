import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import { getFirstChar } from '@/shared/layouts/dashboard/sidebar/utils/getFirstChar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Bolt, EllipsisVertical, LogOut, User } from 'lucide-react';
import { Link } from 'react-router';

const userRolesWithDashboardAccess = ['admin', 'super-admin'];

function SideBarDropDown() {
  const { logout, user } = useUserStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="text-gray-600 size-4.5 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 space-y-4 py-2 px-4">
        <DropdownMenuItem className="border-b border-gray-100 pt-2 py-2 ">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <User className="size-4.5 " />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        {/* For Admin OR Super user only */}
        {user?.role && userRolesWithDashboardAccess.includes(user?.role) && (
          <DropdownMenuItem className="border-b border-gray-100 pt-2 py-2 ">
            <Link to={ROUTES.HOME} className="flex items-center gap-1">
              <Bolt className="size-4.5 " />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={logout}
          className="py-4 flex items-center gap-1 text-danger hover:bg-danger/10 cursor-pointer"
        >
          <LogOut className="size-4.5 text-danger" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="size-13.5 grid place-content-center bg-blue-200/80 shadow-sm uppercase  text-primary font-medium text-lg">
          {`${getFirstChar(user?.firstName)}${getFirstChar(user?.lastName)}`}
        </div>
        <div>
          <h4 className="text-primary font-medium text-lg">
            {user?.firstName}
          </h4>
          <p className="text-gray-600 font-normal text-sm">{user?.email}</p>
        </div>
      </div>

      <SideBarDropDown />
    </div>
  );
}

export default UserInfo;
