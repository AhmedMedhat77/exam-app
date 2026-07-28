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
      setUser: (user, token) =>
        set({
          user,
          token,
          isAdmin: ADMIN_ROLES.includes(user.role.toLowerCase()),
        }),
      logout: () => set({ user: null, token: null, isAdmin: false }),
    }),
    { name: 'user-storage' }
  )
);
