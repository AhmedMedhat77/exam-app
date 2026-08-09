import { ROLE_ENUM } from '@/features/profile/types/user';
import AdminFiltersContainer from '@/features/shared/components/admin/admin-filters-container';
import AdminListHeader from '@/features/shared/components/admin/admin-list-header';
import RoleProtection from '@/shared/lib/role-protection';
import { Button } from '@/shared/ui/button';
import { Shredder } from 'lucide-react';

export default function AuditLogsPage() {
  return (
    <div>
      <AdminListHeader
        limit={10}
        addNewLabel="Audit Log"
        breadcrumbItems={[{ title: 'Audit', href: '/admin/audit' }]}
        actionNode={
          <RoleProtection allowedRoles={[ROLE_ENUM.SUPER_ADMIN]}>
            <Button variant="destructive" size="xl" className="w-fit">
              <Shredder />
              Clear All Logs
            </Button>
          </RoleProtection>
        }
      />
      <AdminFiltersContainer title="Filters">
        {/* Todo This will be select boxes  */}
        <div>Category</div>
        <div>Action</div>
        <div>User</div>

        <div className="flex items-center justify-end gap-1">
          <Button variant="outline" className="w-fit" size="xl">
            Clear
          </Button>
          <Button variant="secondary" className="w-fit" size="xl">
            Apply
          </Button>
        </div>
      </AdminFiltersContainer>
    </div>
  );
}
