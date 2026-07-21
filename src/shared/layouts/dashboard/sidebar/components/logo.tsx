import { ROUTES } from '@/app/routes';
import FileIcon from '@/assets/icons/folder-code.svg';
import LogoImage from '@/assets/icons/logo.svg';
import { Link } from 'react-router';

export function Logo() {
  return (
    <Link to={ROUTES.HOME} className="flex flex-col   gap-2.5">
      <img src={LogoImage} alt="Logo" className="w-48 h-9.25 object-contain" />
      {/* File Icon */}
      <p className="text-primary flex items-center gap-1 text-base font-normal">
        <img
          src={FileIcon}
          alt="File Icon"
          className="size-7.5 object-contain"
        />
        <span className="text-primary font-medium text-lg">Exam App</span>
      </p>
    </Link>
  );
}
