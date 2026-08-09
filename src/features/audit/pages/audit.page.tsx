import AuditFilterContent from '@/features/audit/components/audit-filter-content';
import AuditListTable from '@/features/audit/components/audit-list-table';
import ClearAllAuditDialog from '@/features/audit/components/clear-all-audit-dialog';
import {
  ACTION_QUERY_KEY,
  CATEGORY_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  SORT_BY_KEY,
  SORT_ORDER_KEY,
  USER_QUERY_KEY,
} from '@/features/audit/constants/search-params.keys';
import { useGetAuditLogs } from '@/features/audit/hooks/use-get-audit-logs';
import type {
  AuditAction,
  AuditCategory,
  AuditSortBy,
  AuditSortOrder,
} from '@/features/audit/types/audit.d';
import { ROLE_ENUM } from '@/features/profile/types/user';
import AdminFiltersContainer from '@/features/shared/components/admin/admin-filters-container';
import AdminListHeader from '@/features/shared/components/admin/admin-list-header';
import RoleProtection from '@/shared/lib/role-protection';
import { Button } from '@/shared/ui/button';
import { Shredder, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

const LIMIT = 20;

export default function AuditLogsPage() {
  const [searchParams] = useSearchParams();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const page = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const category =
    (searchParams.get(CATEGORY_QUERY_KEY) as AuditCategory) || undefined;
  const action =
    (searchParams.get(ACTION_QUERY_KEY) as AuditAction) || undefined;
  const actorUserId = searchParams.get(USER_QUERY_KEY) || undefined;
  const search = searchParams.get(SEARCH_QUERY_KEY) || undefined;
  const sortBy = (searchParams.get(SORT_BY_KEY) as AuditSortBy) || undefined;
  const sortOrder =
    (searchParams.get(SORT_ORDER_KEY) as AuditSortOrder) || undefined;

  const { data, isLoading } = useGetAuditLogs({
    page,
    limit: LIMIT,
    category,
    action,
    actorUserId,
    search,
    sortBy,
    sortOrder,
  });

  const metadata = data?.payload?.metadata;
  const logs = data?.payload?.data ?? [];

  return (
    <div className="max-w-full space-y-6">
      <AdminListHeader
        limit={LIMIT}
        pageQueryKey={PAGE_QUERY_KEY}
        total={metadata?.total ?? 0}
        totalPages={metadata?.totalPages ?? 1}
        isLoading={isLoading}
        breadcrumbItems={[{ title: 'Audit', href: '/admin/audit' }]}
        actionNode={
          <RoleProtection allowedRoles={[ROLE_ENUM.SUPER_ADMIN]}>
            <Button
              variant="destructive"
              size="xl"
              className="w-fit cursor-pointer"
              onClick={() => setIsClearDialogOpen(true)}
              disabled={isLoading || (metadata?.total ?? 0) === 0}
            >
              <Shredder className="size-4" />
              Clear All Logs
            </Button>
          </RoleProtection>
        }
      />

      <AdminFiltersContainer
        title="Search & Filters"
        icon={<SlidersHorizontal className="size-5" />}
      >
        <AuditFilterContent />
      </AdminFiltersContainer>

      <AuditListTable logs={logs} isLoading={isLoading} />

      <ClearAllAuditDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}
      />
    </div>
  );
}
