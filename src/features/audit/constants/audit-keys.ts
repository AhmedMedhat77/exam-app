export const AUDIT_KEYS = {
  all: ['audit-logs'] as const,
  lists: () => [...AUDIT_KEYS.all, 'list'] as const,
  list: (params?: unknown) => [...AUDIT_KEYS.lists(), params] as const,
  details: () => [...AUDIT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...AUDIT_KEYS.details(), id] as const,
};
