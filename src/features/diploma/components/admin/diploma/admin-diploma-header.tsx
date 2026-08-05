import AdminListHeader, {
  type AdminListHeaderProps,
} from '@/features/shared/components/admin/admin-list-header';

export type AdminDiplomaHeaderProps = AdminListHeaderProps;

export default function AdminDiplomaHeader(props: AdminDiplomaHeaderProps) {
  return <AdminListHeader addNewLabel="Add New Diploma" {...props} />;
}
