import { AUDIT_KEYS } from '@/features/audit/constants/audit-keys';
import AuditService from '@/features/audit/services/audit.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useClearAllAuditLogs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuditService.clearAllAuditLogsApi(),
    onSuccess: () => {
      toastUtil('All audit logs cleared successfully', 'success');
      queryClient.invalidateQueries({ queryKey: AUDIT_KEYS.lists() });
    },
    onError: (error: Error) => {
      toastUtil(error.message || 'Failed to clear audit logs', 'error');
    },
  });
};
