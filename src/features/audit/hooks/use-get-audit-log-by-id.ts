import { AUDIT_KEYS } from '@/features/audit/constants/audit-keys';
import AuditService from '@/features/audit/services/audit.service';
import { useQuery } from '@tanstack/react-query';

export const useGetAuditLogById = (id?: string) => {
  return useQuery({
    queryKey: AUDIT_KEYS.detail(id!),
    queryFn: () => AuditService.getAuditLogByIdApi(id!),
    enabled: !!id,
  });
};
