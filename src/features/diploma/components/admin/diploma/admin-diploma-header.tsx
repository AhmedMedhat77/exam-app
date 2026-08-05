import AdminHeader, {
  type AdminHeaderProps,
} from '@/features/shared/components/admin/admin-header';

export type AdminDiplomaHeaderProps = AdminHeaderProps;

export default function AdminDiplomaHeader(props: AdminDiplomaHeaderProps) {
  return <AdminHeader addNewLabel="Add New Diploma" {...props} />;
}
