import AdminListHeader from '@/features/shared/components/admin/admin-list-header';
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
          <Button variant="destructive" size="xl" className="w-fit">
            <Shredder />
            Clear All Logs
          </Button>
        }
      />
    </div>
  );
}
