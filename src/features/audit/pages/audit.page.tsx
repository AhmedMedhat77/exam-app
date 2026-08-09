import { ROLE_ENUM } from '@/features/profile/types/user';
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
    </div>
  );
}
