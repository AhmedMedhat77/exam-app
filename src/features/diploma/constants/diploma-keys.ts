import type { IGetDiplomaParams } from '@/features/diploma/types/diploma.d';

export const DIPLOMA_QUERY_KEYS = {
  diplomas: {
    getAll: (params?: IGetDiplomaParams) =>
      ['diplomas', 'all', { ...params }] as const,
    getById: (id: string) => ['diplomas', 'detail', id] as const,
  },
};
