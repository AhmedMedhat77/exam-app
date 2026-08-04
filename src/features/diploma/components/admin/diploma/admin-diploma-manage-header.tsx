import { ROUTES } from '@/app/routes';
import type { IDiploma } from '@/features/diploma/types/diploma.d';
import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import { type BreadcrumbItem } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';
import { useBreadcrumb } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.hooks';
import { Button } from '@/shared/ui/button';
import { Save } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

interface IAdminDiplomaManageHeaderProps {
  diploma?: IDiploma;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function AdminDiplomaManageHeader({
  diploma,
  isSubmitting = false,
  onCancel,
}: IAdminDiplomaManageHeaderProps) {
  const navigate = useNavigate();

  const breadcrumb: BreadcrumbItem[] = useMemo(
    () => [
      { title: 'Diplomas', href: ROUTES.DIPLOMAS },
      { title: diploma?.title || 'Add New Diploma' },
    ],
    [diploma?.title]
  );

  useBreadcrumb({
    items: breadcrumb,
  });

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(ROUTES.DIPLOMAS);
    }
  };

  return (
    <div className="-mx-4 -my-7.5 grid gap-4 bg-white px-4 py-5">
      <BreadCrumb items={breadcrumb} />

      <div className="flex items-center justify-end gap-2 self-end">
        <Button
          type="button"
          variant="ghost"
          className="w-fit"
          onClick={handleCancelClick}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="success"
          className="w-fit"
          disabled={isSubmitting}
        >
          <Save className="size-4" />
          <span>{isSubmitting ? 'Saving...' : 'Save'}</span>
        </Button>
      </div>
    </div>
  );
}
