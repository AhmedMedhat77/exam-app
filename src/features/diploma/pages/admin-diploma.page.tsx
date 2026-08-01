import AdminDiplomaHeader from '@/features/diploma/components/admin/diploma/admin-diploam-header';
import AdminDiplomaFilterContent from '@/features/diploma/components/admin/diploma/admin-diploma-filter-content';
import AdminDiplomaList from '@/features/diploma/components/admin/diploma/admin-diploma-list';
import AdminFiltersContainer from '@/shared/components/admin-filters-container';
import { SlidersHorizontal } from 'lucide-react';

export default function AdminDiplomaPage() {
  return (
    <div className="max-w-full">
      <AdminDiplomaHeader />
      <AdminFiltersContainer
        title="Search & Filters"
        icon={<SlidersHorizontal className="size-6" />}
      >
        <AdminDiplomaFilterContent />
      </AdminFiltersContainer>
      <AdminDiplomaList />
    </div>
  );
}
