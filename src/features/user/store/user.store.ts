import type { User } from '@/features/user/types/user.types';
import { ADMIN_ROLES } from '@/shared/layouts/dashboard/sidebar/constants/admin-roles';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  haveAdminRules: boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      haveAdminRules: false,
      setUser: (user, token) =>
        set({
          user,
          token,
          haveAdminRules: ADMIN_ROLES.includes(user.role),
        }),
      logout: () => set({ user: null, token: null, haveAdminRules: false }),
    }),
    { name: 'user-storage' }
  )
);
