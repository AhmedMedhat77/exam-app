import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import { ADMIN_ROLES } from '@/shared/layouts/dashboard/sidebar/constants/admin-roles';
import { useSidebarStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { getFirstChar } from '@/shared/layouts/dashboard/sidebar/utils/get-first-char';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Bolt, EllipsisVertical, LogOut, UserRound } from 'lucide-react';
import { Link } from 'react-router';

function UserInfo() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { avatar, email, name } = useSidebarStyles();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={cn(avatar)}>
              {`${getFirstChar(user?.firstName)}${getFirstChar(user?.lastName)}`}
            </div>
            <div className="w-full text-start">
              <h4 className={cn(name)}>{user?.firstName}</h4>
              <p className={cn(email)}>{user?.email}</p>
            </div>
          </div>
          <EllipsisVertical className="size-4.5 cursor-pointer text-gray-600" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 space-y-4 px-4 py-2">
        <DropdownMenuItem className="border-b border-gray-100 py-2 pt-2">
          <Link to={ROUTES.HOME} className="flex items-center gap-1">
            <UserRound className="size-4.5" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        {/* For Admin OR Super user only */}
        {user?.role && ADMIN_ROLES.includes(user.role) && (
          <DropdownMenuItem className="border-b border-gray-100 py-2 pt-2">
            <Link to={ROUTES.HOME} className="flex items-center gap-1">
              <Bolt className="size-4.5" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={logout}
          className="text-danger hover:bg-danger/10 flex cursor-pointer items-center gap-1 py-4"
        >
          <LogOut className="text-danger size-4.5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserInfo;
