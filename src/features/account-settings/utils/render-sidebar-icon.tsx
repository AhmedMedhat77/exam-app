import { cn } from '@/shared/lib/utils';
import { Lock, UserRound } from 'lucide-react';

export const renderSidebarIcon = (route: string, isActive: boolean) => {
  switch (route) {
    case 'PROFILE':
      return <UserRound className={cn('size-4', isActive && 'text-primary')} />;
    case 'CHANGE_PASSWORD':
      return <Lock className={cn('size-4', isActive && 'text-primary')} />;
    default:
      return <UserRound className="size-4" />;
  }
};
