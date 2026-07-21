import { ROUTES } from '@/app/routes';
import LogoImage from '@/assets/icons/logo.svg';
import { cn } from '@/shared/lib/utils';
import { FolderCode } from 'lucide-react';
import { Link } from 'react-router';

export function Logo({ isAdmin }: { isAdmin: boolean }) {
  return (
    <Link to={ROUTES.HOME} className="flex flex-col gap-2.5">
      <img src={LogoImage} alt="Logo" className="w-48 h-9.25 object-contain" />
      {/* File Icon */}
      <p
        className={cn(
          'flex items-center gap-1 text-base font-normal',
          !isAdmin ? 'text-primary' : 'text-white'
        )}
      >
        <FolderCode className={'size-7.5'} />

        <span className={'font-medium text-lg'}>Exam App</span>
      </p>
    </Link>
  );
}
