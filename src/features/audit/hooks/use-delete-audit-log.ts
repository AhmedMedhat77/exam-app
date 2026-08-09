import { AUDIT_KEYS } from '@/features/audit/constants/audit-keys';
import AuditService from '@/features/audit/services/audit.service';
import toastUtil from '@/shared/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAuditLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AuditService.deleteAuditLogApi(id),
    onSuccess: () => {
      toastUtil('Audit log entry deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: AUDIT_KEYS.lists() });
    },
    onError: (error: Error) => {
      toastUtil(error.message || 'Failed to delete audit log entry', 'error');
    },
  });
};
