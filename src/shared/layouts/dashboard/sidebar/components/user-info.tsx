import { ROUTES } from '@/app/routes';
import { useUserStore } from '@/features/user/store/user.store';
import { ADMIN_ROLES } from '@/shared/layouts/dashboard/sidebar/constants/admin-roles';
import {
  useSidebarAvatarStyles,
  useSidebarEmailStyles,
  useSidebarNameStyles,
} from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
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

function UserInfo() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const avatarStyles = useSidebarAvatarStyles();
  const nameStyles = useSidebarNameStyles();
  const emailStyles = useSidebarEmailStyles();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={cn(avatarStyles)}>
              {`${getFirstChar(user?.firstName)}${getFirstChar(user?.lastName)}`}
            </div>
            <div className="w-full text-start">
              <h4 className={cn(nameStyles)}>{user?.firstName}</h4>
              <p className={cn(emailStyles)}>{user?.email}</p>
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
        {user?.role && ADMIN_ROLES.includes(user.role) && (
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
