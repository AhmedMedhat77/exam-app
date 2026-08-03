import AdminHeader, {
  type AdminHeaderProps,
} from '@/shared/components/admin-header';

export type AdminDiplomaHeaderProps = AdminHeaderProps;

export default function AdminDiplomaHeader(props: AdminDiplomaHeaderProps) {
  return <AdminHeader addNewLabel="Add New Diploma" {...props} />;
}
