import { useUserStore } from '@/features/user/store/user.store';

/**
 * @description
 * This Function takes array of allowed roles if it exists it show children else null
 */
export default function RoleProtection({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useUserStore();
  const isAllowed = allowedRoles.some((role) => user?.role.includes(role));
  return isAllowed ? <>{children}</> : null;
}
