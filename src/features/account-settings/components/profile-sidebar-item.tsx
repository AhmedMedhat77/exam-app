import { cn } from '@/shared/lib/utils';
import { NavLink } from 'react-router';

interface IProfileSidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export default function ProfileSidebarItem({
  title,
  path,
  icon,
  isActive,
}: IProfileSidebarItem) {
  return (
    <NavLink
      to={path}
      className={cn(
        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
        isActive
          ? 'text-primary bg-blue-50'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      )}
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
}
