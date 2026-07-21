import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import { getFirstChar } from '@/shared/layouts/dashboard/sidebar/utils/getFirstChar';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Bolt, EllipsisVertical, LogOut, UserRound } from 'lucide-react';
import { Link } from 'react-router';

const userRolesWithDashboardAccess = ['admin', 'super-admin'];

function UserInfo({ isAdmin }: { isAdmin: boolean }) {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'size-13.5 grid place-content-center border aspect-square shadow-sm uppercase  font-medium text-lg',
                isAdmin
                  ? 'bg-gray-400 text-white'
                  : 'border-primary text-primary'
              )}
            >
              {`${getFirstChar(user?.firstName)}${getFirstChar(user?.lastName)}`}
            </div>
            <div className="w-full text-start">
              <h4
                className={cn({
                  'font-medium text-lg': true,
                  'text-primary': !isAdmin,
                  'text-white': isAdmin,
                })}
              >
                {user?.firstName}
              </h4>
              <p
                className={cn({
                  'text-gray-600 font-normal text-sm': true,
                  'text-white': isAdmin,
                })}
              >
                {user?.email}
              </p>
            </div>
          </div>
          <EllipsisVertical className="text-gray-600 size-4.5 cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 space-y-4 py-2 px-4">
        <DropdownMenuItem className="border-b border-gray-100 pt-2 py-2 ">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <UserRound className="size-4.5 " />
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

export default UserInfo;
