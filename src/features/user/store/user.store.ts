import type { User } from '@/features/user/types/user.d';
import { ADMIN_ROLES } from '@/shared/layouts/dashboard/sidebar/constants/admin-roles';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,
      setUser: (user, token) => {
        const patchedUser = { ...user };
        set({
          user: patchedUser,
          token,
          isAdmin: ADMIN_ROLES.includes(user.role || ''),
        });
      },
      logout: () =>
        set((state) => ({
          ...state,
          user: null,
          token: null,
          isAdmin: false,
        })),
      navigate: () => window.location.replace('/login'),
    }),
    { name: 'user-storage' }
  )
);

export const isSuperAdmin = (role?: string | null): boolean => {
  if (!role) return false;
  const normalized = role.toLowerCase().replace(/[-_]/g, '');
  return normalized === 'superadmin';
};

export const useIsSuperAdmin = (): boolean => {
  const role = useUserStore((s) => s.user?.role);
  return isSuperAdmin(role);
};
