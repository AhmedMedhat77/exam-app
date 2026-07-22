import type { IGetDiplomaParams } from '@/features/diploma/types/diploma.types';

export const DIPLOMA_QUERY_KEYS = {
  diplomas: {
    getAll: (params?: IGetDiplomaParams) =>
      ['diplomas', 'all', { ...params }] as const,
  },
};
