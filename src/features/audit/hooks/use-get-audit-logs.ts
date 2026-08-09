import { AUDIT_KEYS } from '@/features/audit/constants/audit-keys';
import AuditService from '@/features/audit/services/audit.service';
import type { IGetAuditLogsParams } from '@/features/audit/types/audit.d';
import { useQuery } from '@tanstack/react-query';

export const useGetAuditLogs = (params?: IGetAuditLogsParams) => {
  return useQuery({
    queryKey: AUDIT_KEYS.list(params),
    queryFn: () => AuditService.getAuditLogsApi(params),
  });
};
