import { ROUTES } from '@/app/routes';
import FolderIconOutline from '@/assets/icons/folder-code-outline.svg';
import FolderIcon from '@/assets/icons/folder-code.svg';
import LogoImage from '@/assets/icons/logo.svg';
import WhiteLogo from '@/assets/icons/white-logo.svg';
import { useUserStore } from '@/features/user/store/user.store';
import { useSidebarStyles } from '@/shared/layouts/dashboard/sidebar/styles/sidebar.styles';
import { cn } from '@/shared/lib/utils';
import { Link } from 'react-router';

export function Logo() {
  const { logoText } = useSidebarStyles();
  const isAdmin = useUserStore((state) => state.isAdmin);
  return (
    <Link to={ROUTES.DIPLOMAS} className="flex flex-col gap-2.5">
      <img
        src={isAdmin ? WhiteLogo : LogoImage}
        alt="Logo"
        className="h-9.25 w-48 object-contain"
      />
      {/* File Icon */}
      <p className={cn(logoText)}>
        <img
          src={isAdmin ? FolderIconOutline : FolderIcon}
          alt={'folder-icon'}
          className={cn(isAdmin ? 'size-6.5' : 'size-7.5')}
        />
        <span className="text-lg font-medium">Exam App</span>
      </p>
    </Link>
  );
}
