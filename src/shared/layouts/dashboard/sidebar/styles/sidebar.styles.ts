import { useUserStore } from '@/features/user/store/user.store';
import { ADMIN_ROLES } from '@/shared/layouts/dashboard/sidebar/constants/admin-roles';
import { cva } from 'class-variance-authority';

// START of styles
const sidebarContainerCva = cva(
  'w-90.5 border-r flex flex-col justify-between p-10 transition-colors',
  {
    variants: {
      role: {
        user: 'bg-blue-50 border-blue-50',
        admin: 'bg-gray-800 border-gray-800',
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
);

const sidebarLinkCva = cva(
  'flex items-center gap-2 px-4 py-4.5 rounded-md transition-colors',
  {
    variants: {
      role: {
        user: 'w-full px-4 border hover:bg-blue-100',
        admin: 'bg-transparent border text-white',
      },
      isActive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        role: 'user',
        isActive: true,
        className: 'text-primary bg-blue-100 border-primary',
      },
      {
        role: 'user',
        isActive: false,
        className: 'text-gray-600 border-transparent',
      },
      {
        role: 'admin',
        isActive: true,
        className: 'bg-gray-700 border-gray-400',
      },
      {
        role: 'admin',
        isActive: false,
        className: 'border-transparent',
      },
    ],
    defaultVariants: {
      role: 'user',
      isActive: false,
    },
  }
);

const sidebarLogoTextCva = cva(
  'flex items-center gap-1 text-base font-normal',
  {
    variants: {
      role: {
        user: 'text-primary',
        admin: 'text-white',
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
);

const sidebarAvatarCva = cva(
  'size-13.5 grid place-content-center border aspect-square shadow-sm uppercase font-medium text-lg',
  {
    variants: {
      role: {
        user: 'border-primary text-primary bg-blue-200/80',
        admin: 'bg-gray-400 border-gray-300 text-white',
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
);

const sidebarNameCva = cva('font-medium text-lg', {
  variants: {
    role: {
      user: 'text-primary',
      admin: 'text-white',
    },
  },
  defaultVariants: {
    role: 'user',
  },
});

const sidebarEmailCva = cva('font-normal text-sm', {
  variants: {
    role: {
      user: 'text-gray-600',
      admin: 'text-white',
    },
  },
  defaultVariants: {
    role: 'user',
  },
});

// END of styles

// Check is Admin
export const isSidebarAdminRole = (role?: string | null): boolean => {
  return Boolean(role && ADMIN_ROLES.includes(role));
};

// Set Admin or User role
export const useSidebarRole = (overrideRole?: string): 'admin' | 'user' => {
  const userRole = useUserStore((s) => s.user?.role);
  const isAdmin = isSidebarAdminRole(overrideRole ?? userRole);
  return isAdmin ? 'admin' : 'user';
};
// Use all styles
export const useSidebarStyles = (overrideRole?: string) => {
  const role = useSidebarRole(overrideRole);
  return {
    role,
    container: sidebarContainerCva({ role }),
    link: (isActive: boolean) => sidebarLinkCva({ role, isActive }),
    logoText: sidebarLogoTextCva({ role }),
    avatar: sidebarAvatarCva({ role }),
    name: sidebarNameCva({ role }),
    email: sidebarEmailCva({ role }),
  };
};
